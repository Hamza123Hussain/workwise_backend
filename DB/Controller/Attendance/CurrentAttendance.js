import { AttendanceModel } from '../../Models/Attendance.js'
import { User } from '../../Models/User.js'

export const CurrentAttendance = async (req, res) => {
  const { Email } = req.query
  try {
    // Check if the user exists by querying the User model with the email
    const ExistUser = await User.findOne({ Email })

    if (ExistUser) {
      // Fetch the latest attendance record for the user where CheckInStatus is true
      const latestAttendance = await AttendanceModel.find({
        Email: ExistUser.Email,
      }) // Sort by currentDate in descending order

      // If no record is found, return a 404 error
      if (!latestAttendance) {
        return res.status(404).json({ message: 'No attendance records found' })
      }

      const LatestIndex = latestAttendance.length - 1
      // Respond with the latest attendance data
      return res.status(200).json(latestAttendance[LatestIndex])
    } else {
      // If user doesn't exist, respond with 404
      return res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    // Catch any errors and return a 500 status code
    return res.status(500).json({ message: error.message })
  }
}
