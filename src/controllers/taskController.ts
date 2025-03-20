import { Request, Response } from "express";
import Task from "../models/taskModel";


export const createTask = async (req: Request, res: Response): Promise<void> => {{
    try {
        
        const {  title} = req.body;
        const { parentId } = req.params;
        
        const newTask = new Task({title});
        
        if(parentId) {
            const parentTask = await Task.findById(parentId);
            
            if(!parentTask) {
                res.status(404).json({message: " Parent task not found"});
                return;
            }
            newTask.parentId = parentTask._id;
            
            parentTask.subtasks.push(newTask._id);
            
            await parentTask.save();
        }
        await newTask.save();
        res.status(201).json(newTask);
    } catch(error: unknown) {
        res.status(500).json({message: (error as Error).message});
    }
}};



export const getTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({parentId: { $exists: false }}).populate({
        path: "subtasks",
        populate: {
            path: "subtasks", // Populate subtasks inside each subtask
        },
    });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
 };


 export const deleteTask = async (req: Request, res: Response):Promise<void> => {{
    try {
        
      const task = await Task.findByIdAndDelete(req.params.id);
      
      if (!task) res.status(404).json({ message: "Task not found" });

      await Task.updateMany({}, { $pull: { subtasks: req.params.id } });
        
      res.json({ message: "Task deleted" });
    } catch (error) {
      res.status(500).json({ message:  (error as Error).message });
    }
}};


export const updateTask = async (req: Request, res: Response):Promise<void> => {{
    try {
      const { completed } = req.body;
      const task = await Task.findByIdAndUpdate(req.params.id, { completed }, { new: true });
      if (!task) res.status(404).json({ message: "Task not found" });
  
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }};