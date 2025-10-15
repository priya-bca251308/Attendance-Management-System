const mongoose = require('mongoose');

const attendanceSchema =new mongoose.Schema( 
  {
  employeeid:  { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Employee', required: true 
    },
  date:{ 
    type: Date, 
    default: Date.now 
},
  status:{type: String, 
    enum: ['present', 'absent'], default: 'absent'
   },
  markedby: 
  { type: String, 
    enum: ['admin', 'manager', 'employee'], required: true }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
