import { TaskModel } from '../../Models/Task.js'
import { User } from '../../Models/User.js'

export const CreateTask = async (req, res) => {
  const { description, dueDate, assignedTo, name, Email } = req.body

  try {
    // Check if the user exists using findOne instead of find
    const UserExist = await User.findOne({ Email })

    if (UserExist) {
      // Create the task
      const TaskCreate = await TaskModel.create({
        name,
        assignedTo,
        dueDate,
        description,
      })
      await TaskCreate.save()
      // Return the created task
      return res
        .status(201)
        .json({ message: 'Task created successfully', task: TaskCreate })
    } else {
      // If user does not exist, return 404
      return res.status(404).json({ message: 'User does not exist' })
    }
  } catch (error) {
    // Log the error for debugging purposes (optional)
    console.error('Error creating task:', error)

    // Return a generic error message to the client
    return res
      .status(500)
      .json({ message: 'An error occurred while creating the task' })
  }
}
