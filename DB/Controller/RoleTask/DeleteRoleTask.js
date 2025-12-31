import RoleTasks from '../../Models/RoleTasks.js'
import { User } from '../../Models/User.js'

export const DeleteARoleTask = async (req, res) => {
  const { UserID, RoleTasksId } = req.query

  try {
    const existingUser = await User.findById(UserID)
    if (!existingUser) {
      return res
        .status(401)
        .json({ message: 'You are not authorized to delete roles' })
    }

    const deleted = await RoleTasks.findByIdAndDelete(RoleTasksId)
    if (!deleted)
      return res.status(404).json({ message: 'Role task not found' })

    return res
      .status(200)
      .json({ message: 'Role task deleted', deletedRoleTask: deleted })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error deleting role task', error: error.message })
  }
}
