import UserTask from '../../Models/employeetasks.js'
export const updateTask = async (req, res) => {
  const { UserId, TaskId } = req.params // Extract UserId and TaskId from request parameters
  const { Completed } = req.body
  try {
    // Find the task document and update it
    const updatedTask = await UserTask.findOneAndUpdate(
      { UserId, _id: TaskId }, // Match both UserId and TaskId
      {
        $set: {
          Completed,
        },
      },
      { new: true } // Return the updated task document
    )

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.status(200).json({
      message: 'Task updated successfully',
      data: updatedTask,
    })
  } catch (error) {
    console.error('Error updating task:', error)
    res.status(500).json({
      message: 'Failed to update task',
      error: error.message,
    })
  }
}
