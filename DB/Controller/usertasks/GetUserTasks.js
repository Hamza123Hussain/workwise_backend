import UserTask from '../../Models/employeetasks.js'

export const getUserTasks = async (req, res) => {
  const { UserId } = req.params

  try {
    // Find all tasks for the specified UserId
    const userTasks = await UserTask.find({ UserId })

    // if (!userTasks || userTasks.length === 0) {
    //   return res.status(404).json({ message: 'No tasks found for this user' })
    // }

    res.status(200).json({
      message: 'Tasks retrieved successfully',
      data: userTasks, // Return the array of tasks
    })
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({
      message: 'Failed to fetch tasks',
      error: error.message,
    })
  }
}
