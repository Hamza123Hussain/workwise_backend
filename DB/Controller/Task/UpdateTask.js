import { TaskModel } from '../../Models/Task.js'
import { User } from '../../Models/User.js'
export const TaskUpdated = async (req, res) => {
  const { id, Email, progress, description, priority, TaskCompletion } =
    req.body
  try {
    const UserExist = await User.findOne({ Email })
    if (UserExist) {
      const TaskExist = await TaskModel.findById(id)
      if (!TaskExist) {
        return res.status(404).json({ message: 'Task not found' })
      }
      // Update the task
      const TaskUpdated = await TaskModel.findByIdAndUpdate(
        id,
        { progress, description, priority, TaskCompletion },
        { new: true } // This returns the updated document
      )
      // Return the updated task
      return res
        .status(200)
        .json({ message: 'Task updated successfully', task: TaskUpdated })
    } else {
      return res.status(404).json({ message: 'User does not exist' })
    }
  } catch (error) {
    console.error('Error updating task:', error)
    // Return a generic error message to the client
    return res
      .status(500)
      .json({ message: 'An error occurred while updating the task' })
  }
}
