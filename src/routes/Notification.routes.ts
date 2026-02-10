import 'module-alias/register.js'

import { Router } from "express";
import { NotificationController } from '@controllers/Notification.Controller.js';

const notifRouter = Router()

notifRouter.get('/', NotificationController.fetch)
notifRouter.post('/', NotificationController.create)
notifRouter.delete("/:id", NotificationController.remove)

export default notifRouter;