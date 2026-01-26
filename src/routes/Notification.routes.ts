import 'module-alias/register.js'

import { Router } from "express";
import { NotificationController } from '@controllers/Notification.Controller.js';

const router = Router()

router.get('/', NotificationController.fetch)
router.post('/', NotificationController.create)
router.delete("/:id", NotificationController.remove)

export default router;