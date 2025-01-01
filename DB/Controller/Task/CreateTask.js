import { Report } from '../../Models/Report.js'
import { TaskModel } from '../../Models/Task.js'
import { User } from '../../Models/User.js'
import { v4 } from 'uuid'
export const createTask = async (req, res) => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' })
  const { name, description, priority, TaskType, dueDate, assignedTo } =
    req.body
  try {
    // Find the user
    const user = await User.findOne({ Name: assignedTo })
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with name ${assignedTo} not found.` })
    }
    // Get the current month
    const currentMonth = new Date().toLocaleString('default', { month: 'long' })
    // Check if a report exists
    let report = await Report.findOne({
      UserName: user.Name,
      Month: currentMonth,
    })
    // Calculate points based on task priority
    let totalPoints = 0
    if (priority === 'HIGH') {
      totalPoints = 10
    } else if (priority === 'MEDIUM') {
      totalPoints = 5
    } else if (priority === 'LOW') {
      totalPoints = 2.5
    }
    // Update or create a report
    if (report) {
      if (priority === 'HIGH') {
        report.HighPriorityTask += 1
        report.Total_HighPrioritpoints += 10
      } else if (priority === 'MEDIUM') {
        report.mediumPriorityTask += 1
        report.Total_MediumPrioritypoints += 5
      } else if (priority === 'LOW') {
        report.lowPriorityTask += 1
        report.Total_LowPriorityPoints += 2.5
      }
      report.TotalTasks += 1
      report.TotalPoints += totalPoints
      await report.save()
    } else {
      report = new Report({
        UserID: user._id,
        UserName: user.Name,
        TotalTasks: 1,
        TaskPercentage: 0, // Update later if needed
        AttendancePercentage: 0, // Update later if needed
        HighPriorityTask: priority === 'HIGH' ? 1 : 0,
        mediumPriorityTask: priority === 'MEDIUM' ? 1 : 0,
        lowPriorityTask: priority === 'LOW' ? 1 : 0,
        PointsGained: 0,
        HighPrioritpoints: 0,
        LowPriorityPoints: 0,
        MediumPrioritypoints: 0,
        Total_HighPrioritpoints: priority === 'HIGH' ? 10 : 0,
        Total_MediumPrioritypoints: priority === 'MEDIUM' ? 5 : 0,
        Total_LowPriorityPoints: priority === 'LOW' ? 2.5 : 0,
        TotalPoints: totalPoints, // Set based on the task's priority
        Month: currentMonth,
      })
      await report.save()
    }
    // Determine the due date based on TaskType
    let taskDueDate = dueDate // Use provided dueDate if specified
    if (!dueDate) {
      taskDueDate = new Date() // Default to today
      if (TaskType === 'Weekly') {
        taskDueDate.setDate(taskDueDate.getDate() + 7) // Add 7 days for Weekly tasks
      }
    }
    // Create a new task
    const task = new TaskModel({
      _id: v4(),
      name,
      description,
      priority,
      TaskType,
      dueDate: taskDueDate,
      assignedTo,
      PointsGained: 0, // PointsGained is 0 when the task is created
      TotalPoints: totalPoints, // Set TotalPoints based on priority
    })
    // Save the task to the database
    await task.save()
    return res.status(200).json({ message: 'Task created successfully', task })
  } catch (error) {
    console.error('Error creating task:', error)
    return res
      .status(500)
      .json({ message: 'Error creating task', error: error.message })
  }
}
