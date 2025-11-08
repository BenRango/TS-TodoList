import 'module-alias/register.js'

import { Router } from "express";
import { TaskController } from "@controllers/Task.Controller.js";

const router = Router()

router.get('/', TaskController.getTasks)
router.post('/', TaskController.createTask)
router.put('/:id', TaskController.updateTask)
router.delete("/:id", TaskController.deleteTask)

export default router;