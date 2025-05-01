import UserTask from '../../Models/employeetasks.js'

export const getUserTasksForCurrentMonth = async (req, res) => {
  const { UserId } = req.query

  try {
    // Get the current date
    const now = new Date()

    // Start of the current month (e.g., 2025-05-01T00:00:00.000Z)
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    // End of the current month (just before the next month starts)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

    // Find all tasks for the specified UserId created within the current month
    const userTasks = await UserTask.find({
      UserId,
      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    }).sort({ createdAt: -1 })

    res.status(200).json({
      count: userTasks.length,
      data: userTasks,
    })
  } catch (error) {
    console.error('Error fetching monthly tasks:', error)
    res.status(500).json({
      message: 'Failed to fetch tasks for the current month',
      error: error.message,
    })
  }
}
