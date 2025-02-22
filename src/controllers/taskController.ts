import { Request, Response } from "express";
import Task from "../models/taskModel";

console.log('run------------------------')
export const createTask = async (req: Request, res: Response): Promise<void> => {{
    try {
        console.log('start-----------------------', req.body, req.params)
        const {  title} = req.body;
        const { parentId } = req.params;
        console.log( 'data---------------------------', title, parentId)


        const newTask = new Task({title});
        
    
        if(parentId) {

            const parentTask = await Task.findById(parentId);
            console.log('parentTask----------------------', parentTask);
            if(!parentTask) {
                res.status(404).json({message: " Parent task not found"});
                return;
            }
            newTask.isParentId = true;
            parentTask.subtasks.push(newTask._id);
            await parentTask.save();

        }

        await newTask.save();

        res.status(201).json(newTask);

    } catch(error: unknown) {
        res.status(500).json({message: (error as Error).message});
    }
}
};



export const getTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({isParentId: false}).populate("subtasks");
      console.log("tasks------------", tasks);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };