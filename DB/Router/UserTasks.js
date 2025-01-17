import { Router } from 'express'
import { createTask } from '../Controller/usertasks/CreateTask.js'
import { getTask } from '../Controller/usertasks/GetATask.js'
import { updateTask } from '../Controller/usertasks/UpdateTask.js'
import { deleteTask } from '../Controller/usertasks/DeleteTask.js'
import { getUserTasks } from '../Controller/usertasks/GetUserTasks.js'
import { getAllTasks } from '../Controller/usertasks/AllTasks.js'

export const UserTaskRouter = Router()

// Create a new task for a user
UserTaskRouter.post('/CreateNewTask', createTask)

// Get all tasks for a user
UserTaskRouter.get('/:UserId/GetUserTasks', getUserTasks)

// Get a single task by taskId and userId
UserTaskRouter.get('/:UserId/SingleTask/:TaskId', getTask)

// Update a specific task by taskId and userId
UserTaskRouter.put('/:UserId/UpdateTask/:TaskId', updateTask)

// Delete a specific task by taskId and userId
UserTaskRouter.delete('/DeleteTask', deleteTask)

UserTaskRouter.get('/:UserId/AllTasks', getAllTasks)
