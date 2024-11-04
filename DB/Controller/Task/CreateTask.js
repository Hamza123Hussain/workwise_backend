import { v4 } from 'uuid'
import { TaskModel } from '../../Models/Task.js'
import { User } from '../../Models/User.js'
import dayjs from 'dayjs' // Use dayjs for date manipulation, install with `npm i dayjs`

export const CreateTask = async (req, res) => {
  const { description, dueDate, assignedTo, name, Email, priority, TaskType } =
    req.body
  const randomid = v4()

  try {
    // Check if the user exists using findOne
    const UserExist = await User.findOne({ Email })

    if (UserExist) {
      // Set the due date based on the TaskType
      let calculatedDueDate = dueDate // Default is the provided due date
      const currentDate = dayjs()

      if (TaskType === 'Daily') {
        calculatedDueDate = currentDate.toISOString() // Use today's date
      } else if (TaskType === 'Weekly') {
        calculatedDueDate = currentDate.add(7, 'day').toISOString() // Set due date to one week from now
      }

      // Create the task with multiple assigned users
      const TaskCreate = await TaskModel.create({
        _id: randomid,
        name,
        assignedTo, // Assigned to multiple users
        dueDate: calculatedDueDate,
        description,
        priority,
        TaskType,
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
