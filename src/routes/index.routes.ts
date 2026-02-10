import 'module-alias/register.js'

import { Router } from "express";
import authRouter from '@routes/Auth.routes.js';

const router = Router()

router.use("/auth", authRouter)
router.use('/tasks', (await import('@routes/Task.routes.js')).default)
router.use('/notifications', (await import('@routes/Notification.routes.js')).default)

export default router;