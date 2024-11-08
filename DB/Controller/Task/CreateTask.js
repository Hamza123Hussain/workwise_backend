import { TaskModel } from '../../Models/Task.js'
import { v4 } from 'uuid'
// Function to create a task for a single user
const createTaskForUser = async ({
  name,
  description,
  priority,
  TaskType,
  dueDate,
  assignedTo,
}) => {
  const task = new TaskModel({
    _id: v4(),
    name,
    description,
    priority,
    TaskType,
    dueDate,
    assignedTo,
  })

  try {
    await task.save()
    return task
  } catch (error) {
    console.error('Error saving task for user:', assignedTo, error)
    throw error // Rethrow the error so it can be caught in the controller
  }
}

// Main createTask function
export const createTask = async (req, res) => {
  const { name, description, priority, TaskType, dueDate, assignedTo } =
    req.body

  // Check if assignedTo is a single user or an array
  if (Array.isArray(assignedTo)) {
    // If assignedTo is an array, loop through and create a task for each user
    try {
      const taskPromises = assignedTo.map((user) =>
        createTaskForUser({
          name,
          description,
          priority,
          TaskType,
          dueDate,
          assignedTo: user,
        })
      )
      await Promise.all(taskPromises) // Wait for all tasks to be created
      return res
        .status(200)
        .json({ message: 'Tasks created for multiple users' })
    } catch (error) {
      console.error('Error creating tasks for multiple users:', error)
      return res.status(500).json({
        message: 'Error creating tasks for multiple users',
        error: error.message,
      })
    }
  } else {
    // If assignedTo is a single user, create the task for that user
    try {
      await createTaskForUser({
        name,
        description,
        priority,
        TaskType,
        dueDate,
        assignedTo,
      })
      return res.status(200).json({ message: 'Task created for user' })
    } catch (error) {
      console.error('Error creating task for user:', assignedTo, error)
      return res
        .status(500)
        .json({ message: 'Error creating task', error: error.message })
    }
  }
}
