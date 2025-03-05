import UserTask from '../../Models/employeetasks.js'

export const getUserTasks = async (req, res) => {
  const { UserId } = req.query

  try {
    // Find all tasks for the specified UserId and sort by createdAt in descending order
    const userTasks = await UserTask.find({ UserId }).sort({ createdAt: -1 })

    if (!userTasks || userTasks.length === 0) {
      return res.status(200).json([])
    }

    res.status(200).json({
      message: 'Tasks retrieved successfully',
      data: userTasks, // Return the array of tasks sorted by latest first
    })
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({
      message: 'Failed to fetch tasks',
      error: error.message,
    })
  }
}
