import 'module-alias/register.js'

import { Router } from "express";
import authRouter from '@routes/Auth.routes.js';
import { Middleware } from '../middlewares/middleware.js';

const router = Router()

router.use("/auth", authRouter)
router.use('/tasks', Middleware.authMiddleware, (await import('@routes/Task.routes.js')).default)
router.use('/notifications', (await import('@routes/Notification.routes.js')).default)

export default router;