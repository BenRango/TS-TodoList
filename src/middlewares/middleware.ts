import type { NextFunction, Response } from "express"

export class Middleware{
    static showPayload = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Payload : ", req.body)
        next()
    }
}