const express = require('express');
const router = express.Router();
const admincontroller = require('./admincontroller');

router.post('/signup',admincontroller.signup);
router.post('/login', admincontroller.login);
router.get('/attendance',admincontroller.viewAllAttendance);
router.put('/attendance/:id',admincontroller.modifyAttendance);

module.exports = router;
