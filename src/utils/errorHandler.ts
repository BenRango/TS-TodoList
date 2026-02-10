import type { Response } from "express"
import { logger } from "../index.js"

export const handle = (error: Error , res: Response) =>{
    if (error instanceof Error && error.name === "ValidationError") {
        const errors = Object.values((error as any).errors).map((err: any) => err.properties)
        res.status(400).json({ message: "Erreur de validation.", errors })
        return
    }
    logger.error({error})
    res.status(500).json({error : (error as {message : String}).message})
}