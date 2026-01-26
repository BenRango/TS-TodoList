import 'module-alias/register.js'

import { Router } from "express";

const router = Router()

router.use('/tasks', (await import('@routes/Task.routes.js')).default)
router.use('/notifications', (await import('@routes/Notification.routes.js')).default)
router.use('/auth', (await import('@routes/Auth.routes.js')).default)

export default router;