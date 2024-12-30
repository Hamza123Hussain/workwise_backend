import mongoose from 'mongoose'

const ReportSchema = new mongoose.Schema({
  UserID: { type: String, required: true },
  UserName: { type: String, required: true },
  TotalTasks: { type: Number },
  TaskPercentage: { type: Number },
  AttendancePercentage: { type: Number, default: 0 },
  PerformancePercentage: { type: Number, default: 0 },
  HighPriorityTask: { type: Number },
  mediumPriorityTask: { type: Number },
  lowPriorityTask: { type: Number },
  HighPrioritpoints: { type: Number },
  MediumPrioritypoints: { type: Number },
  LowPriorityPoints: { type: Number },
  Total_HighPrioritpoints: { type: Number },
  Total_MediumPrioritypoints: { type: Number },
  Total_LowPriorityPoints: { type: Number },
  PointsGained: { type: Number },
  TotalPoints: { type: Number },
  TotalHours: { type: Number, default: 0 },
  HoursWorked: { type: Number, default: 0 },
  Salary: { type: Number, default: 0 },
  Month: { type: String, required: true },
  UpdatedAt: {
    type: Date,
    default: Date.now,
  },
})
export const Report = mongoose.model('Report', ReportSchema)
