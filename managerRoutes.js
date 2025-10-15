const express = require('express');
const router = express.Router();
const managercontroller = require('./managercontroller');

router.post('/signup',managercontroller.signup);
router.post('/login',managercontroller.login);
router.get('/attendance',managercontroller.viewEmployees);
router.put('/attendance/:id',    managercontroller.updateAttendance);

module.exports =  router;
