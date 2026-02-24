import { Request } from 'express';
import { User, type UserInterface } from '@models/User.ts';
import 'express';

declare global {
    namespace Express {
        interface Request {
            user? : UserInterface
        }
    }
}
