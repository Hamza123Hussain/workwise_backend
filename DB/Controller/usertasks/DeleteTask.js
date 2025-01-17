import UserTask from '../../Models/employeetasks.js'
import { User } from '../../Models/User.js'

export const deleteTask = async (req, res) => {
  const { UserId, taskId } = req.query // Extract UserId and taskId from the parameters

  try {
    // Step 1: Find the user by UserId
    const existingUser = await User.findById(UserId)

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Step 2: Find and delete the task by taskId and UserId
    const deletedTask = await UserTask.findOneAndDelete({
      UserId,
      _id: taskId,
    })

    if (!deletedTask) {
      return res
        .status(404)
        .json({ message: 'Task not found or already deleted' })
    }

    // Step 3: Respond with a success message
    return res.status(200).json({
      message: 'Task deleted successfully',
      data: deletedTask,
    })
  } catch (error) {
    console.error('Error deleting task:', error)
    return res.status(500).json({
      message: 'Failed to delete task',
      error: error.message,
    })
  }
}
