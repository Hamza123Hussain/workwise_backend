import { Router } from 'express'
import { createTask } from '../Controller/usertasks/CreateTask.js'
import { UserTasks } from '../Controller/Task/UserTasks.js'
import { getAllTasks } from '../Controller/usertasks/GetUserTasks.js'
import { getTask } from '../Controller/usertasks/GetATask.js'
import { updateTask } from '../Controller/usertasks/UpdateTask.js'

export const UserTaskRouter = Router()
UserTaskRouter.post('/CreateNewTask', createTask)
UserTaskRouter.get('', UserTasks)
UserTaskRouter.get('/GetAllTasks', getAllTasks)
UserTaskRouter.get('/SingleTask', getTask)
UserTaskRouter.put('/UpdateTask', updateTask)
