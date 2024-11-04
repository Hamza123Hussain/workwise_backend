import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  assignedTo: {
    type: [String], // Define as an array of strings for multiple assignees
    required: true,
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH'], // Example enum for priority levels
    required: true,
  },
  TaskType: {
    type: String,
    enum: ['Daily', 'Weekly', 'Other'], // Example task types
    required: true,
  },
})

export const TaskModel = mongoose.model('Task', TaskSchema)
