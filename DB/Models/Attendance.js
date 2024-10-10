import mongoose from 'mongoose'

const AttendanceSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
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
  User_ID: {
    type: String,
    requried: true,
  },
  Email: {
    type: String,
    required: true,
  },
  CheckInStatus: {
    type: Boolean,
    default: false,
  },
  onBreak: {
    type: Boolean,
    default: false,
  },

  Break_Start: {
    // Changed to camelCase for consistency
    type: Date,
  },
  Break_end: {
    // Changed to camelCase for consistency
    type: Date,
  },
})

// Create and export the Attendance model
export const AttendanceModel = mongoose.model('Attendance', AttendanceSchema)
