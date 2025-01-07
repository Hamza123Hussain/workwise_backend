import mongoose from 'mongoose'

// Define the RoleTasks schema
const RoleTasksSchema = new mongoose.Schema(
  {
    RoleName: {
      type: String,
      required: true,
      unique: true,
    },
    Tasks: [
      {
        TaskName: { type: String, required: true },
        Priority: {
          type: String,
          enum: ['Low', 'Medium', 'High'],
          required: true,
        },
        Completed: { type: Boolean, default: false },
        PointsGained: { type: Number, default: 0 },
        TotalPoints: { type: Number, default: 0 },
      },
    ],
    UsersAssigned: [
      {
        UserId: {
          type: String,
          ref: 'User',
          required: true,
        },
        UserEmail: { type: String, required: true, lowercase: true },
        UserName: { type: String, required: true, trim: true },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
)

// Create the RoleTasks model
const RoleTasks = mongoose.model('RoleTasks', RoleTasksSchema)

export default RoleTasks
