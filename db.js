const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/att");
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
};
module.exports = connectDB;