import { Router } from 'express'
import { CreateTask } from '../Controller/Task/CreateTask.js'
import { TaskUpdated } from '../Controller/Task/UpdateTask.js'
import { AllTasks } from '../Controller/Task/AllTasks.js'
import { UserTasks } from '../Controller/Task/UserTasks.js'
import { DeleteTask } from '../Controller/Task/DeleteTask.js'

const TaskRouter = Router()

TaskRouter.post('/CreateNewTask', CreateTask)
TaskRouter.put('/UpdateTask', TaskUpdated)
TaskRouter.get('/AllTasks', AllTasks)
TaskRouter.get('/GetUserTasks', UserTasks)
TaskRouter.delete('/DeleteTask', DeleteTask)

export default TaskRouter
