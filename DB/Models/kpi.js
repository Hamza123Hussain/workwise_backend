import mongoose from 'mongoose'

const KpiSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      ref: 'User',
      required: true,
      unique: true,
    },
    HoursWorked: { type: Number, default: 0 },
    Salary: { type: Number, default: 0 },
    TotalSalary: { type: Number, default: 0 },
    UserEmail: { type: String, required: true, lowercase: true },
    UserName: { type: String, required: true, trim: true },
    Targets: [
      {
        TargetName: { type: String, required: true, trim: true },
        TargetValue: { type: Number, required: true, min: 0 },
        TargetAchieved: { type: Boolean, default: false },
        ValueAchieved: { type: Number, default: 0, min: 0 },
        AchievedOn: { type: Date },
        Priority: {
          type: String,
          enum: ['High', 'Medium', 'Low'],
          required: true,
        },
        PointsGained: { type: Number, default: 0, min: 0 },
        TotalPoints: { type: Number, default: 0, required: true, min: 0 },
      },
    ],
    PointsGained: { type: Number, default: 0, min: 0 },
    TotalPoints: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
  },
)

export const KPIModel = mongoose.model('KPI', KpiSchema)
