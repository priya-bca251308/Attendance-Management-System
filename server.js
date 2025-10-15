const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
const JWT_SECRET = 'saymyname';

mongoose.connect('mongodb://localhost:27017/AMS')
  .then(()   =>console.log("MongoDB connected"))
  .catch((err) =>console.log("MongoDB connection error:",err));

const adminRoutes =require('./models/adminRoutes');
const managerRoutes =require('./models/managerRoutes');
const employeeRoutes =require('./models/employeeRoutes');

app.use('/admin',adminRoutes);
app.use('/manager',managerRoutes);
app.use('/employee',employeeRoutes);

app.listen(3000,()=>console.log("Serverr running on port 3000"));
