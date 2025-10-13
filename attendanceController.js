const Attendance=require("./models/Attendance");

exports.markAttendance=async(req,res)=>{
    try{
        const{status}=req.body;
        const attendance=await Attendance.create({
            user:req.user._id,
            status,
        });
        res.status(201).json(attendance);
    }catch(error){
        res.status(500).json({message:error});
    }
};

exports.getAttendance=async(req,res)=>{
    try{
        const record=await Attendance.find({user:req.user._id})("user","name email");
        res.json(records);  
    }catch(error){
        res.status(500).json({message:error});
    }
};