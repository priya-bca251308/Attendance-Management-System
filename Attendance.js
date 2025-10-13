const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema(
{
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["admin","manage","user"],
        default:"user",
    },
    email:{
        type:String,
        required:true,
    }

});
module.exports = mongoose.model('User', AttendanceSchema);
export default Admin;
