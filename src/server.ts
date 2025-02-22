
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import taskRoutes from "./routes/taskRoutes";



dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());



app.use("/api/tasks", taskRoutes);
const PORT = process.env.PORT || 8000;

connectDB().then(()=> {
app.listen(PORT,()=> console.log(`server running on port ${PORT}`))

});