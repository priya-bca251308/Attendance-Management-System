const Admin =require('./admin');
const Attendance = require('./attendance');
const AuditLog = require('./auditlog');
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');


exports.signup =async (req, res) =>{
  try {
    const {name,email,password} = req.body;
    const check = await Admin.findOne({email});
    if(check) return res.json({message:"Admin already exists"});

    const hash =await bcrypt.hash(password, 10);


    const newAdmin = new Admin({name,email,password:hash});


    await newAdmin.save();
    res.json({ message: "Admin created successfully", newAdmin });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.login = async(req, res) => {
  try {
    const { email,password} = req.body;
    const adminUser =await Admin.findOne({ email });
    if(!adminUser) return res.json({message:"Admin not found" });

    const flag = await bcrypt.compare(password, adminUser.password);
    if (!flag) return res.json({ message:"Invalid password"});

    const token = jwt.sign({ id: adminUser._id,role:"admin"},'saymyname');
    res.json({ message: "Login success", token });
  } catch(err) {
    res.json({message:err.message});
  }
};

exports.viewAllAttendance =async(req,res) =>{
  try{
    const records = await Attendance.find().populate('employeeid');
    res.json(records);
  } catch (err) {
    res.json({ message: err.message});
  }
};

exports.modifyAttendance = async (req, res) =>   {
  try   {
    const{newStatus } = req.body;
    const record = await Attendance.findById(req.params.id);
    if(!record)return res.json({message:'Record not found'});

    const log=new AuditLog({
      attendanceid:record._id,
      changedby:'admin',
      oldstatus:record.status,
      newstatus:newStatus
    });
    await log.save();

    record.status =newStatus;
    await record.save();

    res.json({ message:"Attendance updated", record});
  } catch(err){
    res.json({message: err.message});
  }
};

