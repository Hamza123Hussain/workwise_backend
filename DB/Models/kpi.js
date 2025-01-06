import mongoose from 'mongoose'

const KpiSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      ref: 'User',
      required: true,
    },
    UserEmail: { type: String, required: true, lowercase: true }, // Ensure consistent email format
    UserName: { type: String, required: true, trim: true }, // Trim extra spaces
    Targets: [
      {
        TargetName: { type: String, required: true, trim: true }, // Ensure target name is provided
        TargetValue: { type: Number, required: true, min: 0 }, // Add minimum validation
        TargetAchieved: { type: Boolean, default: false }, // Default false if not provided
        ValueAchieved: { type: Number, default: 0, min: 0 }, // Default value and minimum validation
        AchievedOn: { type: Date }, // Add optional field to track when the target was achieved
        Priority: { type: String },
        PointsGained: { type: Number, default: 0, min: 0 }, // Default value and minimum validation
        TotalPoints: { type: Number, required: true, min: 0 }, // Ensure a total point value is always provided
      },
    ],
    PointsGained: { type: Number, default: 0, min: 0 }, // Default value and minimum validation
    TotalPoints: { type: Number, required: true, min: 0 }, // Ensure a total point value is always provided
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
)

export const KPIModel = mongoose.model('KPI', KpiSchema)
