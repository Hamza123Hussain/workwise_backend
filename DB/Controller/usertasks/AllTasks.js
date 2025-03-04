import UserTask from '../../Models/employeetasks.js'
import { User } from '../../Models/User.js'

export const getAllTasks = async (req, res) => {
  const { UserId } = req.query

  try {
    // Find the user by UserId
    const existingUser = await User.findById(UserId)

    // Check if the email matches the specified one
    if (existingUser && existingUser.Email === 'octtoppus1@gmail.com') {
      // Find all tasks for the user
      const userTasks = await UserTask.find()

      if (!userTasks) {
        return res.status(404).json({ message: 'No tasks found for this user' })
      }

      return res.status(200).json(userTasks)
    } else {
      return res.status(403).json({ message: 'Unauthorized access' })
    }
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return res.status(500).json({
      message: 'Failed to fetch tasks',
      error: error.message,
    })
  }
}
