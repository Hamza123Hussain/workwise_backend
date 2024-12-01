import mongoose from 'mongoose'

const ReportSchema = new mongoose.Schema({
  UserID: { type: String, required: true, unique: true },
  UserName: { type: String, required: true },
  TotalTasks: { type: Number, required: true },
  TaskPercentage: { type: Number, required: true },
  AttendancePercentage: { type: Number, required: true },
  PerformancePercentage: { type: Number, required: true },
  HighPriorityTask: { type: Number, required: true },
  mediumPriorityTask: { type: Number, required: true },
  lowPriorityTask: { type: Number, required: true },
  HighPrioritpoints: { type: Number, required: true },
  MediumPrioritypoints: { type: Number, required: true },
  LowPriorityPoints: { type: Number, required: true },
  PointsGained: { type: Number, required: true },
  TotalPoints: { type: Number, required: true },
})
