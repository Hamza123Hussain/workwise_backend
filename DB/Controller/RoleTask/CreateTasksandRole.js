import RoleTasks from '../../Models/RoleTasks.js'
import { User } from '../../Models/User.js'
import { PointsGained_BasedOnPriority } from './PointsBasedonpriority.js'

export const CreateRoleTasks = async (req, res) => {
  const { UserId, RoleName, Tasks = [] } = req.body

  try {
    const existingUser = await User.findById(UserId)
    if (!existingUser)
      return res.status(404).json({ message: 'User not found' })

    const roleExists = await RoleTasks.findOne({ RoleName })
    if (roleExists)
      return res.status(400).json({ message: 'Role already exists' })

    const UpdatedTasks = PointsGained_BasedOnPriority(Tasks)

    const newRole = new RoleTasks({
      RoleName,
      Tasks: UpdatedTasks,
      UsersAssigned: [
        {
          UserId,
          UserEmail: existingUser.Email,
          UserName: existingUser.Name,
        },
      ],
    })

    const saved = await newRole.save()
    return res
      .status(201)
      .json({ message: 'Role tasks created', roleTasks: saved })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Error creating role tasks', error: error.message })
  }
}
