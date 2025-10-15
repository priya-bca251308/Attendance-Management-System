const Employee = require("./employee");
const Attendance = require("./attendance");
const AuditLog = require('./auditlog');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const check = await Employee.findOne({ email });
    if (check) return res.json({ message: "Employee already exists" });

    const hash = await bcrypt.hash(password, 10);
    const newEmployee = new Employee({ name, email, password: hash });
    await newEmployee.save();

    res.json({ message: "Employee created successfully", newEmployee });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });
    if (!employee) return res.json({ message: "Employee not found" });

    const flag = await bcrypt.compare(password, employee.password);
    if (!flag) return res.json({ message: "Invalid password" });

    const token = jwt.sign({ id: employee._id, role: "employee" }, 'saymyname');
    res.json({ message: "Login success", token });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.markattendance = async (req, res) => {
  try {
    const { employeeid, status } = req.body;
    const existing = await Attendance.findOne({
      employeeid,
      date: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999)
      }
    });
    if (existing) return res.json({ message: "Already marked for today" });

    const newAttendance = new Attendance({ employeeid, status, markedby: "employee" });
    await newAttendance.save();

    res.json({ message: "Attendance marked", newAttendance });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.viewattendance = async (req, res) => {
  try {
    const logs = await AuditLog.find({ attendanceid: req.params.attendanceid });
    res.json(logs);
  } catch (err) {
    res.json({ message: err.message });
  }
};

