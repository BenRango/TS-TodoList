import type { NextFunction, Request, Response } from "express"
import { JWT_SECRET_KEY } from "../env.mjs";
import jwt from "jsonwebtoken"
import { User, type UserInterface } from "@models/User.js";
import { logger } from "../index.js";
export class Middleware{
    static showPayload = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Payload : ", req.body)
        next()
    }
    static authMiddleware = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({ message: "Non authentifié" });
            return;
        }

  const token = authHeader.split(" ")[1];

        if (!token) {
            res.status(401).json({ message: "Token mal formé." });
            return;
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET_KEY as string) as { id: string };
            const user = await User.findOne({ _id: decoded.id });

            if (!user) {
                res.status(401).json({ message: "Utilisateur inexistant." });
                return;
            }

            req.user = user as UserInterface ;

            next();
        } catch (error: any) {
            const msg = error.name === "TokenExpiredError" ? "Session expirée" : "Token invalide";
            logger.error({ err: error.message }, "Auth Error");
            res.status(401).json({ message: msg });
        }
    };
}