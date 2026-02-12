import RoleTasks from '../../Models/RoleTasks.js'
import { User } from '../../Models/User.js'
import { PointsGained_BasedOnPriority } from './PointsBasedonpriority.js'

export const CreateRoleTasks = async (req, res) => {
  const { RoleName, Tasks = [], Users = [] } = req.body

  try {
    if (!RoleName)
      return res.status(400).json({ message: 'RoleName is required' })

    if (!Users.length)
      return res
        .status(400)
        .json({ message: 'At least one user must be assigned' })

    const roleExists = await RoleTasks.findOne({ RoleName })
    if (roleExists)
      return res.status(400).json({ message: 'Role already exists' })

    // Fetch users
    const userIds = Users.map(u => u.UserId)
    const usersFromDB = await User.find({ _id: { $in: userIds } })

    if (usersFromDB.length !== Users.length) {
      return res
        .status(404)
        .json({ message: 'One or more users not found' })
    }

    const UsersAssigned = usersFromDB.map(user => ({
      UserId: user._id,
      UserEmail: user.Email,
      UserName: user.Name,
    }))

    const UpdatedTasks = PointsGained_BasedOnPriority(Tasks)

    const newRole = new RoleTasks({
      RoleName,
      Tasks: UpdatedTasks,
      UsersAssigned,
    })

    const savedRole = await newRole.save()

    return res.status(201).json({
      message: 'Role tasks created successfully',
      roleTasks: savedRole,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Error creating role tasks',
      error: error.message,
    })
  }
}
