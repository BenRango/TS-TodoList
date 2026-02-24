import 'module-alias/register.js'

import { Task } from "@models/Task.js";
import type { Request, Response } from "express";
import type { UserInterface } from '@models/User.js';

export class TaskController {
    static getTasks = async (req: Request, res: Response): Promise<void> =>{
        try{
            const tasks = await Task.find({
                author : req.user?._id
            }).sort({createdAt: -1})
            res.status(200).json(tasks);
            return 
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
            return
        }

    }
    static createTask = async (req : Request, res: Response): Promise <void> => {
        try {
            const task = new Task()
            Object.assign(task, req.body as {description : string, label : string, deadline : Date})
            task.author = req.user!
            await task.save()
            res.status(201).json(task)
        } catch (error) {
            if (error instanceof Error && error.name === "ValidationError") {
                const errors = Object.values((error as any).errors).map((err: any) => err.properties)
                res.status(400).json({ message: "Erreur de validation.", errors })
                return
            }
            res.status(500).json({error : (error as {message : String}).message})
        }
        
    }
    static updateTask =  async (req: Request, res: Response) : Promise<void> =>{
        try {
            const _id = req.params.id
            const task = await Task.findOne({_id})
            if (!task) {
                res.status(404).json({message: "Task not found"})
                return
            }
            Object.assign(task, req.body)
            await task.save()
            res.status(200).json({message: "Edition succed", task})
            return
        } catch (error) {
            console.log({payload: req.body})
            if (error instanceof Error && error.name === "ValidationError") {
                const errors = Object.values((error as any).errors).map((err: any) => err.properties)
                console.log({error})
                res.status(400).json({ message: "Erreur de validation.", errors })
                return
            }
            res.status(500).json({error : (error as {message : String}).message})
        }
        
        
    }
    static deleteTask = async (req: Request, res: Response): Promise <void> =>{
        try {
            const task = Task.findOne({_id : req.params.id})
            if (!task) {
                res.status(404).json({message: "Task not found"})
                return
            }
            await Task.deleteOne(task)
            res.status(204).send()
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
            return
        }
    }
}