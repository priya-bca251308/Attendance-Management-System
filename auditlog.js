const mongoose = require('mongoose');

const auditlogSchema= new mongoose.Schema({
  attendanceid:
   { 
    type:mongoose.Schema.Types.ObjectId, 
    ref:'Attendance', required: true 
  },
  changedby: 
  { type: String, required: true, 
    enum: ['admin', 'manager', 'employee'] },

  oldstatus: 
  { type:String, required: true, 
    enum: ['present', 'absent']
   },
  newstatus: 
  { type:String, required: true,
     enum:['present', 'absent']
     },
  timestamp: { 
    type:Date, 
    default:Date.now }
});

module.exports = mongoose.model('AuditLog', auditlogSchema);
