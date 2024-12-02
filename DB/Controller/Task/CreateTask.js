import { Report } from '../../Models/Report.js'
import { TaskModel } from '../../Models/Task.js'
import { User } from '../../Models/User.js'
export const createTask = async ({
  name,
  description,
  priority,
  TaskType,
  dueDate,
  assignedTo,
}) => {
  const user = await User.findOne({ Name: assignedTo })
  if (!user) {
    throw new Error(`User with name ${assignedTo} not found.`)
  }
  // Get the current month in the format used in the database (e.g., "December")
  const currentMonth = new Date().toLocaleString('default', { month: 'long' })
  let report = await Report.findOne({
    UserName: user.Name,
    Month: currentMonth,
  })
  let totalPoints = 0
  if (priority === 'HIGH') {
    totalPoints = 10
  } else if (priority === 'MEDIUM') {
    totalPoints = 5
  } else if (priority === 'LOW') {
    totalPoints = 2.5
  }
  // Update report fields based on task priority
  if (report) {
    if (priority === 'HIGH') {
      report.HighPriorityTask += 1
    } else if (priority === 'MEDIUM') {
      report.mediumPriorityTask += 1
    } else if (priority === 'LOW') {
      report.lowPriorityTask += 1
    }
    // Increment TotalTasks and PointsGained
    report.TotalTasks += 1
    report.TotalPoints += totalPoints
    await report.save()
  } else {
    // If no report exists for the user and month, create a new one
    report = new Report({
      UserID: user._id,
      UserName: user.Name,
      TotalTasks: 1,
      TaskPercentage: 0, // Update later if needed
      AttendancePercentage: 0, // Update later if needed
      HighPriorityTask: priority === 'HIGH' ? 1 : 0,
      mediumPriorityTask: priority === 'MEDIUM' ? 1 : 0,
      lowPriorityTask: priority === 'LOW' ? 1 : 0,
      TotalPoints: totalPoints, // Set based on the task's priority
      Month: currentMonth,
    })

    await report.save()
  }
  // Determine the due date based on TaskType
  if (TaskType === 'Daily') {
    dueDate = new Date() // Set to current date for Daily tasks
  } else if (TaskType === 'Weekly') {
    dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 7) // Add 7 days for Weekly tasks
  }
  // Create a new task with the provided details
  const task = new TaskModel({
    _id: v4(),
    name,
    description,
    priority,
    TaskType,
    dueDate,
    assignedTo,
    PointsGained: 0, // PointsGained is 0 when the task is created
    TotalPoints: totalPoints, // Set TotalPoints based on priority
  })
  try {
    // Save the task to the database
    await task.save()
    return task
  } catch (error) {
    console.error('Error saving task for user:', assignedTo, error)
    throw error // Rethrow the error to be handled by the controller
  }
}
