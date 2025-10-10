import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 7000;  
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running successfully Task MERN Stack Developer");
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
