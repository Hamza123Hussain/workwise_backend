import { AttendanceModel } from '../../Models/Attendance.js'
import { User } from '../../Models/User.js'

export const UserAttendance = async (req, res) => {
  const { Email, UserData } = req.query
  try {
    // Check if the user exists by querying the User model with the email
    const ExistUser = await User.findOne({ Email })

    if (!ExistUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Define the date range for 2025
    const startOf2025 = new Date('2025-01-01T00:00:00Z')
    const endOf2025 = new Date('2025-12-31T23:59:59Z')

    // Fetch attendance records for the given user's data within 2025
    const allAttendance = await AttendanceModel.find({
      UserData,
      currentDate: { $gte: startOf2025, $lte: endOf2025 },
    })

    // If no records are found, return a 404 error
    if (!allAttendance || allAttendance.length === 0) {
      return res
        .status(404)
        .json({ message: 'No attendance records found for 2025' })
    }

    // Respond with success message and the fetched attendance data
    return res.status(200).json(allAttendance)
  } catch (error) {
    // Catch any errors and return a 500 status code
    return res.status(500).json({ message: error.message })
  }
}
