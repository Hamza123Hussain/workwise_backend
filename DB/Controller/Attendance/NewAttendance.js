import { User } from '../../Models/User.js'
import { AttendanceModel } from '../../Models/Attendance.js'

export const NewAttendance = async (req, res) => {
  const { Email, EntryTime } = req.body

  try {
    // Check if the user exists by querying the User model with the email
    const ExistUser = await User.findOne({ Email })

    if (ExistUser) {
      // Create a new attendance record
      const NewAttendance = await AttendanceModel.create({
        UserData: ExistUser._id, // Store user ID instead of just email for better referencing
        entry: EntryTime, // Assuming EntryTime is in the correct format
        isAbsent: false, // Mark user as present
        currentDate: new Date(), // Store the current date
      })

      // Respond with success message and the newly created attendance data
      return res.status(201).json({
        message: 'Attendance recorded successfully',
        attendance: NewAttendance,
      })
    } else {
      // If user doesn't exist, respond with 404
      return res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    // Catch any errors and return a 500 status code
    return res.status(500).json({ error })
  }
}
