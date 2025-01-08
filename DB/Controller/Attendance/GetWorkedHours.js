import { AttendanceModel } from '../../Models/Attendance.js'

export const GetMonthlyHoursWorked = async (req, res) => {
  const { UserId } = req.query

  try {
    // Get the current date, month, and year
    const currentDate = new Date()
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ) // First day of the month
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ) // Last day of the month

    // Fetch attendance records for the user within the current month
    const monthlyAttendance = await AttendanceModel.find({
      User_ID: UserId,
      entry: { $gte: startOfMonth, $lte: endOfMonth }, // Filter by date range
    })

    if (!monthlyAttendance.length) {
      return res.status(404).json({
        message: 'No attendance records found for the current month',
        HoursWorked: 0,
      })
    }

    // Sum up the hours worked for the current month
    const totalHoursWorked = monthlyAttendance.reduce((total, record) => {
      return total + (record.Hours_Worked || 0) // Add Hours_Worked, default to 0 if not set
    }, 0)

    // Respond with the total hours worked
    return res.status(200).json({
      message: 'Hours worked for the current month calculated successfully',
      HoursWorked: totalHoursWorked,
    })
  } catch (error) {
    // Handle errors and respond with appropriate message
    console.error('Error calculating monthly hours worked:', error)
    return res.status(500).json({
      message: 'An error occurred while calculating monthly hours worked',
      error: error.message,
    })
  }
}
