import mongoose from 'mongoose'

// Helper function to get the last day of the current month
const getEndOfMonth = () => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() + 1, 0) // Last day of the current month
}

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
        TaskName: { type: String, required: true }, // Name of the task
        Description: { type: String, default: '' }, // Optional task description
        Priority: {
          type: String,
          enum: ['Low', 'Medium', 'High'], // Priority levels
          required: true,
        },
        Completed: { type: Boolean, default: false }, // Completion status
        PointsGained: { type: Number, default: 0 }, // Points gained for completing the task
        TotalPoints: { type: Number, default: 0 }, // Maximum points available for the task
        DueDate: { type: Date, default: getEndOfMonth }, // Default due date (end of the month)
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
