import mongoose from 'mongoose'

const UserTaskSchema = new mongoose.Schema({
  UserId: {
    type: String,
    required: true,
  },
  Tasks: [
    {
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
        required: true,
      },
    },
  ],
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
