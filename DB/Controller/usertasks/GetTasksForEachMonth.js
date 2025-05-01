import UserTask from '../../Models/employeetasks.js'
export const getUserTasksForEachMonth = async (req, res) => {
  const { UserId } = req.query
  try {
    const monthlyTasks = await UserTask.aggregate([
      // Match only tasks for the specified UserId
      { $match: { UserId } },
      // Add year and month fields based on createdAt
      {
        $addFields: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
      },
      // Group by year and month, and collect tasks
      {
        $group: {
          _id: { year: '$year', month: '$month' },
          tasks: { $push: '$$ROOT' },
          count: { $sum: 1 },
        },
      },
      // Sort by year and month descending (latest first)
      {
        $sort: {
          '_id.year': -1,
          '_id.month': -1,
        },
      },
    ])
    res.status(200).json(monthlyTasks)
  } catch (error) {
    console.error('Error fetching monthly tasks:', error)
    res.status(500).json({
      message: 'Failed to fetch monthly grouped tasks',
      error: error.message,
    })
  }
}
