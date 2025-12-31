import RoleTasks from '../../Models/RoleTasks.js'
import { User } from '../../Models/User.js'
import { PointsGained_BasedOnPriority } from './PointsBasedonpriority.js'

export const UpdateRoleTasks = async (req, res) => {
  const { RoleTasksId, UserId, Tasks = [] } = req.body

  try {
    const existingUser = await User.findById(UserId)
    if (!existingUser)
      return res.status(404).json({ message: 'User not found' })

    const role = await RoleTasks.findById(RoleTasksId)
    if (!role) return res.status(404).json({ message: 'Role tasks not found' })

    const updatedTasks = PointsGained_BasedOnPriority(Tasks)

    updatedTasks.forEach((newTask) => {
      const existingTask = role.Tasks.find(
        (t) => t.TaskName === newTask.TaskName
      )

      if (existingTask) {
        existingTask.Priority = newTask.Priority
        existingTask.Completed = newTask.Completed
        existingTask.Description = newTask.Description
        existingTask.DueDate = newTask.DueDate
        existingTask.TotalPoints = newTask.TotalPoints
        existingTask.PointsGained = newTask.PointsGained
      } else {
        role.Tasks.push(newTask)
      }
    })

    if (!role.UsersAssigned.find((u) => u.UserId === UserId)) {
      role.UsersAssigned.push({
        UserId,
        UserEmail: existingUser.Email,
        UserName: existingUser.Name,
      })
    }

    const saved = await role.save()
    return res
      .status(200)
      .json({ message: 'Role tasks updated', roleTasks: saved })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Error updating role tasks',
      error: error.message,
    })
  }
}
