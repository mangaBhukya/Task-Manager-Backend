import express from "express";
import { createTask, getTasks, deleteTask} from "../controllers/taskController";

const router = express.Router();


router.post("/", createTask);
router.post("/:parentId/subtasks", createTask);
router.get("/", getTasks);
router.delete("/:id", deleteTask);


export default router;