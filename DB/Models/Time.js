import mongoose from 'mongoose'

const TimeSchema = new mongoose.Schema({
  entry: {
    // Changed to camelCase for consistency
    type: Date,
    required: true, // Make it required if you want to ensure entry time is always stored
  },
  exit: {
    // Changed to camelCase for consistency
    type: Date,
    required: true, // Make it required if you want to ensure exit time is always stored
  },
  currentDate: {
    // Changed to camelCase for consistency
    type: Date,
    default: Date.now, // Automatically set to the current date and time
  },
  isAbsent: {
    type: Boolean,
    default: false,
  },
})

// Create and export the Time model
export const TimeModel = mongoose.model('Time', TimeSchema)
