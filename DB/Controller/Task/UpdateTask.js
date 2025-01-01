import { Report } from '../../Models/Report.js'
import { TaskModel } from '../../Models/Task.js'
import { User } from '../../Models/User.js'
import { calculateTaskCompletion } from './Task_Calculation.js'
export const TaskUpdated = async (req, res) => {
  const { id, Email, progress, description, priority, name } = req.body
  // Get current date and time for UpdatedAt field
  const currentDate = new Date()
  const currentMonth = new Date().toLocaleString('default', { month: 'long' })
  try {
    const UserExist = await User.findOne({ Email })
    if (!UserExist) {
      return res.status(404).json({ message: 'User does not exist' })
    }
    const TaskExist = await TaskModel.findById(id)
    if (!TaskExist) {
      return res.status(404).json({ message: 'Task not found' })
    }
    // Calculate TaskCompletion percentage
    const calculatedTaskCompletion = calculateTaskCompletion(progress, priority)
    const pointsGained =
      (calculatedTaskCompletion / 100) * TaskExist.TotalPoints
    // Find the existing report for the user and month
    const ExistingReport = await Report.findOne({
      UserName: UserExist.Name,
      Month: currentMonth,
    })
    if (ExistingReport) {
      ExistingReport.PointsGained += pointsGained
      if (priority == 'HIGH') {
        ExistingReport.HighPrioritpoints += 10
      }
      if (priority == 'LOW') {
        ExistingReport.LowPriorityPoints += 2.5
      } else if (priority === 'MEDIUM') {
        ExistingReport.MediumPrioritypoints += 5
      }
      ExistingReport.TaskPercentage = (
        (ExistingReport.PointsGained / ExistingReport.TotalPoints) *
        100
      ).toFixed(2)
      ExistingReport.UpdatedAt = currentDate
      ExistingReport.PerformancePercentage = (
        ExistingReport.AttendancePercentage * 0.2 +
        ExistingReport.TaskPercentage * 0.8
      ).toFixed(2)
      ExistingReport.Salary =
        (UserExist.Salary * ExistingReport.PerformancePercentage) / 100
      await ExistingReport.save()
    }
    // Update the task
    const TaskUpdated = await TaskModel.findByIdAndUpdate(
      id,
      {
        progress,
        name,
        description,
        priority,
        TaskCompletion: calculatedTaskCompletion,
        PointsGained: pointsGained, // Update task's PointsGained field
        UpdatedBY: Email,
        UpdatedAt: currentDate,
      },
      { new: true } // Return the updated document
    )
    return res.status(200).json({
      message: 'Task and report updated successfully',
      task: TaskUpdated,
    })
  } catch (error) {
    console.error('Error updating task and report:', error)
    return res.status(500).json({
      message: 'An error occurred while updating the task and report',
    })
  }
}
