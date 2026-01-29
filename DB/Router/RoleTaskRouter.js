import { Router } from 'express'
import { CreateRoleTasks } from '../Controller/RoleTask/CreateTasksandRole.js'
import { UpdateRoleTasks } from '../Controller/RoleTask/UpdateTasksAndRole.js'
import { GetARole } from '../Controller/RoleTask/GetSingleRole.js'
import { GetAllRoles } from '../Controller/RoleTask/GetAllRoles.js'
import { DeleteARoleTask } from '../Controller/RoleTask/DeleteRoleTask.js'
import { updateDescription } from '../Controller/usertasks/UpdateDescription.js'
import { updateCompletion } from '../Controller/usertasks/UpdateCompletion.js'
import { GetARoleByName } from '../Controller/RoleTask/GetRolesByName.js'

export const RoleTaskRouter = Router()
RoleTaskRouter.post('/CreateNewTask', CreateRoleTasks)
RoleTaskRouter.put('/UpdateTask', UpdateRoleTasks)
RoleTaskRouter.get('/GetAllRoleTasks', GetAllRoles)
RoleTaskRouter.get('/GetSingleRoleTask', GetARole)
RoleTaskRouter.delete('/DeleteTask', DeleteARoleTask)
RoleTaskRouter.put('/UpdateDescription', updateDescription)
RoleTaskRouter.put('/UpdateCompletion', updateCompletion)
RoleTaskRouter.get('/SingleRoleTaskByName', GetARoleByName)
