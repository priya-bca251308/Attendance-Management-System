import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authMiddleware from "./middleware/authmiddleware.js";
import roleMiddleware from "./middleware/roleMiddleware.js";
import {Login,Sign} from "./controllers";

import {
  markAttendance,
  getMyAttendance,
  getAllAttendance
} from "./controllers/attendanceController.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.post("/api/auth/register", registerUser);
app.post("/api/auth/login", loginUser);


app.post("/api/attendance/mark", authMiddleware, markAttendance);
app.get("/api/attendance/my", authMiddleware, getMyAttendance);
app.get(
  "/api/attendance/all",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAllAttendance
);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
