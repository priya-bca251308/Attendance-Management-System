const User =require("./models/User")
const Attendance=require("./models/Attendance");

exports.getAllUsers=async(req,res)=>{
    const user=await User.findOne("password");
    res.json(users);
};

exports.getAllAttendance=async(req,res)=>{
    const records=await Attendance.findOne("user","name email role");
    res.json(records);
};