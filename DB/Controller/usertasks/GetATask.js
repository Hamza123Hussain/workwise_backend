import UserTask from '../../Models/employeetasks.js'

export const getTask = async (req, res) => {
  const { UserId, TaskId } = req.params

  try {
    // Step 1: Find the specific task by taskId and UserId
    const task = await UserTask.findOne({ UserId, _id: TaskId })

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    // Step 2: Respond with the task data
    res.status(200).json({
      message: 'Task retrieved successfully',
      data: task, // Return the task document
    })
  } catch (error) {
    console.error('Error fetching task:', error)
    res.status(500).json({
      message: 'Failed to fetch task',
      error: error.message,
    })
  }
}
