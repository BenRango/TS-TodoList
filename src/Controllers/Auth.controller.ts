import { User } from "@models/User.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import type { Request, Response } from "express"
import { logger } from "../index.js"
import { JWT_SECRET_KEY } from "../env.mjs"
import { handle } from "../utils/errorHandler.js"

export class AuthController {
    static register = async (req: Request, res: Response): Promise<void> => {
        try {
            const { username, email, password, confirmPassword } = req.body;

            const oldUser = await User.findOne({ email });
            if (oldUser) {
                res.status(409).json({ message: "Email already used" });
                return;
            }

            if (password !== confirmPassword) {
                res.status(400).json({ message: "Unmatching passwords" });
                return;
            }

            const hashed = await bcryptjs.hash(password, 10);
            
            const user = await User.create({ username, email, password: hashed });

            const userResponse = user.toObject();
            delete userResponse.password; 

            const token = jwt.sign(
                { id: user._id, email: user.email }, 
                JWT_SECRET_KEY, 
                { expiresIn: "7d" }
            );

            res.status(201).json({ user: userResponse, token });
        } catch (error) {
            handle(error as Error, res);
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const targetUser = await User.findOne({ email }).select('+password');

            if (!targetUser) {
                res.status(401).json({ message: "Invalid Credentials" });
                return;
            }

            const validPassword = await bcryptjs.compare(password, targetUser.password as string);
            if (!validPassword) {
                res.status(401).json({ message: "Invalid Credentials" });
                return;
            }

            const token = jwt.sign(
                { id: targetUser._id, email: targetUser.email }, 
                JWT_SECRET_KEY, 
                { expiresIn: "7d" }
            );

            const userResponse = targetUser.toObject();
            delete userResponse.password;

            res.status(200).json({ user: userResponse, token });
        } catch (err) {
            handle(err as Error, res);
        }
    }
}