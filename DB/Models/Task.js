import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  name: {
    // Changed to camelCase for consistency
    type: String,
    required: true,
  },
  progress: {
    type: String,
    enum: ['TODO', 'Minor_progress', 'IN_PROGRESS', 'DONE'], // Define possible values for progress
    default: 'TODO',
  },
  assignedTo: {
    // Changed to camelCase for consistency
    type: String,
    required: true,
  },
  priority: {
    // Added priority field
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH'], // Define possible values for priority
    default: 'MEDIUM', // Default priority
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
  dueDate: {
    // Optional due date for the task
    type: Date,
  },
  description: {
    // Optional description for the task
    type: String,
  },
  TaskCompletion: {
    // Optional description for the task
    type: Number,
    default: 0,
  },
  TaskType: {
    // Added priority field
    type: String,
    enum: ['Daliy', 'Weekly', 'Other'], // Define possible values for priority
    default: 'Daliy', // Default priority
  },
})

// Create and export the Task model
export const TaskModel = mongoose.model('Task', TaskSchema)
