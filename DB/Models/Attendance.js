import mongoose from 'mongoose'

const AttendanceSchema = new mongoose.Schema({
  UserData: {
    // ref: 'User',
    type: String,
  },
  entry: {
    // Changed to camelCase for consistency
    type: Date,
    required: true, // Make it required if you want to ensure entry Attendance is always stored
  },
  exit: {
    // Changed to camelCase for consistency
    type: Date,
    required: true, // Make it required if you want to ensure exit Attendance is always stored
    default: Date.now,
  },
  currentDate: {
    // Changed to camelCase for consistency
    type: Date,
    default: Date.now, // Automatically set to the current date
  },
  isAbsent: {
    type: Boolean,
    default: false,
  },
})

// Create and export the Attendance model
export const AttendanceModel = mongoose.model('Attendance', AttendanceSchema)