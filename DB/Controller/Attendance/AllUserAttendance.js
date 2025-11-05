import { AttendanceModel } from '../../Models/Attendance.js'

export const AllUser = async (req, res) => {
  const { Email } = req.query
  try {
    // Allow only admin or specific authorized emails
    const authorizedEmails = [
      'gptprompts87@gmail.com',
      'globalgrads.org@gmail.com',
      'octtoppus1@gmail.com',
    ]

    if (!authorizedEmails.includes(Email)) {
      return res.status(404).json({ message: 'User not authorized' })
    }

    // Define the date range for 2025
    const startOf2025 = new Date('2025-01-01T00:00:00Z')
    const endOf2025 = new Date('2025-12-31T23:59:59Z')

    // Fetch all attendance records only for 2025
    const allAttendance = await AttendanceModel.find({
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
