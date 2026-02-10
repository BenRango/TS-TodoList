import 'module-alias/register.js'

import { Router } from "express";
import { TaskController } from "@controllers/Task.Controller.js";

const taskRouter = Router()

taskRouter.get('/', TaskController.getTasks)
taskRouter.post('/', TaskController.createTask)
taskRouter.put('/:id', TaskController.updateTask)
taskRouter.delete("/:id", TaskController.deleteTask)

export default taskRouter;