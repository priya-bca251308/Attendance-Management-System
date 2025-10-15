const Manager = require("./manager");
const Attendance = require("./attendance");
const AuditLog = require("./auditlog");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const check = await Manager.findOne({ email });
    if (check) return res.json({ message: "Manager already exists" });

    const hash = await bcrypt.hash(password, 10);
    const newManager = new Manager({ name, email, password: hash });
    await newManager.save();

    res.json({ message: "Manager created successfully", newManager });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const manager = await Manager.findOne({ email });
    if (!manager) return res.json({ message: "Manager not found" });

    const flag = await bcrypt.compare(password, manager.password);
    if (!flag) return res.json({ message: "Invalid password" });

    const token = jwt.sign({ id: manager._id, role: "manager" }, "saymyname");
    res.json({ message: "Login success", token });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.viewEmployees = async (req, res) => {
  try {
    const records = await Attendance.find().populate("employeeid");
    res.json(records);
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const { newStatus } = req.body;
    const record = await Attendance.findById(req.params.id);
    if (!record) return res.json({ message: "Attendance not found" });

    const log = new AuditLog({
      attendanceid: record._id,
      changedby: "manager",
      oldstatus: record.status,
      newstatus: newStatus,
    });
    await log.save();

    record.status = newStatus;
    await record.save();

    res.json({ message: "Updated successfully", record });
  } catch (err) {
    res.json({ message: err.message });
  }
};
