// backend/Controllers/RoleTaskController.js

import RoleTasks from '../../Models/RoleTasks.js'
import { User } from '../../Models/User.js'
import { PointsGained_BasedOnPriority } from './PointsBasedonpriority.js'

export const UpdateRoleTasks = async (req, res) => {
  const {
    RoleTasksId,
    UserId,
    Tasks = [],
    Users = [],
    RemoveTaskId,
    RemoveUserId,
  } = req.body

  try {
    const role = await RoleTasks.findById(RoleTasksId)
    if (!role) return res.status(404).json({ message: 'Role tasks not found' })

    // --- 1. HANDLE TASK REMOVAL ---
    if (RemoveTaskId) {
      role.Tasks = role.Tasks.filter((t) => t._id.toString() !== RemoveTaskId)
    }

    // --- 2. HANDLE USER REMOVAL ---
    if (RemoveUserId) {
      role.UsersAssigned = role.UsersAssigned.filter(
        (u) => u.UserId.toString() !== RemoveUserId,
      )
    }

    // --- 3. HANDLE TASK ADD/UPDATE ---
    if (Tasks.length > 0) {
      const updatedTasks = PointsGained_BasedOnPriority(Tasks)
      updatedTasks.forEach((newTask) => {
        const existingTask = role.Tasks.find(
          (t) => t.TaskName === newTask.TaskName,
        )
        if (existingTask) {
          Object.assign(existingTask, newTask) // Updates priority, points, etc.
        } else {
          role.Tasks.push(newTask)
        }
      })
    }

    // --- 4. HANDLE USER ADDITION ---
    // If a Users array of IDs is passed, add them
    if (Users.length > 0) {
      for (const uObj of Users) {
        const userDoc = await User.findById(uObj.UserId)
        if (
          userDoc &&
          !role.UsersAssigned.find((u) => u.UserId === uObj.UserId)
        ) {
          role.UsersAssigned.push({
            UserId: userDoc._id,
            UserEmail: userDoc.Email,
            UserName: userDoc.Name,
          })
        }
      }
    }

    const saved = await role.save()
    return res
      .status(200)
      .json({ message: 'Role updated successfully', roleTasks: saved })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error updating role', error: error.message })
  }
}
