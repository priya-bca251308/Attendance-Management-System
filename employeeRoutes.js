const express =require('express');
const router =express.Router();
const employeecontroller =require('./employeecontroller');

router.post('/signup', employeecontroller.signup);
router.post('/login', employeecontroller.login);
router.post('/attendance',employeecontroller.markattendance);
router.get('/attendance/:id', employeecontroller.viewattendance);

module.exports=router;
