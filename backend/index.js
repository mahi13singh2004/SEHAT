import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import aiRoutes from "./routes/ai.route.js"
import appointmentRoutes from "./routes/appointment.route.js"
import listRoutes from "./routes/list.route.js"
import cookieParser from "cookie-parser";
import vaultRoutes from "./routes/vault.route.js"
import cors from "cors"

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
  origin:"https://sehatf-rontend.onrender.com",
  credentials:true
}))

app.use("/api/auth",authRoutes);
app.use("/api/ai",aiRoutes)
app.use("/api/appointment",appointmentRoutes)
app.use("/api/list",listRoutes)
app.use("/api/vault",vaultRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
