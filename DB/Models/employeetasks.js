import mongoose from 'mongoose'
// Helper function to get the last day of the current month
const getEndOfMonth = () => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() + 1, 0) // Last day of the current month
}
const UserTaskSchema = new mongoose.Schema({
  UserId: {
    type: String,
    required: true,
  },
  TaskName: {
    type: String,
    required: true,
  },
  Priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: true,
  },
  PointsGained: {
    type: Number,
    default: 0,
  },
  TotalPoints: {
    type: Number,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  DueDate: {
    type: Date,
    default: getEndOfMonth,
  },
  UserName: {
    type: String, // Added field to store the user's name
    required: true,
  },
  UserEmail: {
    type: String, // Added field to store the user's email
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Middleware to automatically update `updatedAt` on document modification
UserTaskSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

// Export the model
const UserTask = mongoose.model('UserTask', UserTaskSchema)

export default UserTask
