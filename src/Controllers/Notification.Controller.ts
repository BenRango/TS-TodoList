import { Notification } from "@models/Notification.js";
import type { Request, Response } from "express";

export class NotificationController{
    static fetch = async ( req: Request, res : Response) : Promise<void> =>{
        try {
            const notifications = await Notification.find()
            res.status(200).json(notifications)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Unhandled error"})
            return
        }
    }

    static create = async ( req: Request, res : Response) : Promise<void> =>{
        try {
            const notification = new Notification()
            Object.assign(notification, req.body)
            await notification.save()
            res.status(201).json(notification)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Unhandled error"})
            return
        }
    }
    static remove = async (req: Request, res: Response) : Promise<void> =>{
        try {
                const notification = await Notification.findOne({_id: req.params.id})
                if(!notification)
                {
                    res.status(404).json({message: "Notification not found"})
                    return
                }
                Notification.deleteOne({_id: notification._id})
                res.status(204).send()
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Unhandled error"})
            return
        }
        
    }

}