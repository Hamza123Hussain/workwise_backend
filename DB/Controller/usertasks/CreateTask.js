import UserTask from '../../Models/employeetasks.js'
import { User } from '../../Models/User.js'

export const createTask = async (req, res) => {
  const {
    UserId,
    TaskName,
    Priority,
    PointsGained,
    TotalPoints,
    Description,
    DueDate,
  } = req.body

  try {
    // Step 1: Check if the UserId exists in the User collection
    const existingUser = await User.findById(UserId)
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Step 2: Create the new task object, including UserName and UserEmail
    const newTask = new UserTask({
      UserId,
      TaskName,
      Priority,
      PointsGained,
      TotalPoints,
      Description,
      DueDate,
      UserName: existingUser.Name, // Adding UserName from the User model
      UserEmail: existingUser.Email, // Adding UserEmail from the User model
    })

    // Step 3: Save the new task as a separate document
    const savedTask = await newTask.save()

    // Step 4: Respond with the newly created task
    res.status(201).json({
      message: 'Task created successfully',
      data: savedTask, // Return the newly created task
    })
  } catch (error) {
    console.error('Error creating task:', error)
    res.status(500).json({
      message: 'Failed to create task',
      error: error.message,
    })
  }
}
