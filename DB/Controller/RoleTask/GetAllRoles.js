import RoleTasks from '../../Models/RoleTasks.js'
import { User } from '../../Models/User.js'

export const GetAllRoles = async (req, res) => {
  const { UserID } = req.query

  try {
    const existingUser = await User.findById(UserID)

    if (
      !existingUser ||
      existingUser._id.toString() !== 'qdyyLorl9WR27GcAxkBbxHO4sWu1'
    ) {
      return res.status(401).json('You are not authorized to use this API')
    }

    const roles = await RoleTasks.find()
    res.status(200).json(roles)
  } catch (error) {
    res.status(500).json({ Message: 'Error fetching roles', error })
  }
}
