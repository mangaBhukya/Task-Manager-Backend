import express from "express";
import { createTask, getTasks } from "../controllers/taskController";

const router = express.Router();

console.log('post-----------------------------');
router.post("/", createTask);
router.post("/:parentId/subtasks", createTask);
router.get("/", getTasks);

export default router;