import { TimeModel } from '../../Models/Time.js'
import User from '../../Models/User.js'

export const NewAttendance = async (req, res) => {
  const { Email, EntryTime } = req.body

  try {
    // Check if the user exists by querying the User model with the email
    const ExistUser = await User.findOne({ Email })

    if (ExistUser) {
      // Create a new attendance record
      const NewAttendance = await TimeModel.create({
        UserData: ExistUser._id, // Store user ID instead of just email for better referencing
        Entry: EntryTime, // Assuming EntryTime is in the correct format
        IsAbsent: false, // Mark user as present
        CurrentDate: new Date(), // Store the current date
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
    return res.status(500).json({ message: error.message })
  }
}
