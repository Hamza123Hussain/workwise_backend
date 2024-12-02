import mongoose from 'mongoose'

const ReportSchema = new mongoose.Schema({
  UserID: { type: String, required: true, unique: true },
  UserName: { type: String, required: true },
  TotalTasks: { type: Number },
  TaskPercentage: { type: Number },
  AttendancePercentage: { type: Number },
  PerformancePercentage: { type: Number },
  HighPriorityTask: { type: Number },
  mediumPriorityTask: { type: Number },
  lowPriorityTask: { type: Number },
  HighPrioritpoints: { type: Number },
  MediumPrioritypoints: { type: Number },
  LowPriorityPoints: { type: Number },
  PointsGained: { type: Number },
  TotalPoints: { type: Number },
  Month: { type: String, required: true },
})
export const Report = mongoose.model('Report', ReportSchema)
