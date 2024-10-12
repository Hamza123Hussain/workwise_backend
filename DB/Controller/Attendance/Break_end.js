import { AttendanceModel } from '../../Models/Attendance.js'
import { User } from '../../Models/User.js'

export const Break_end = async (req, res) => {
  const { Email, id, Break_end, onBreak } = req.body

  try {
    // Check if the user exists by querying the User model with the email
    const ExistUser = await User.findOne({ Email })

    if (ExistUser) {
      // Fetch the attendance record by the provided ID
      const attendanceRecord = await AttendanceModel.findById(id)

      // If no record is found with the given ID, return a 404 error
      if (!attendanceRecord) {
        return res.status(404).json({ message: 'Attendance record not found' })
      }

      // Extract break start time from the attendance record
      const breakStart = new Date(attendanceRecord.breakStart) // Fixed to match camelCase in schema
      const breakEnd = new Date(Break_end) // Convert Break_end from the request to a Date object

      // Calculate the break duration in milliseconds
      const breakDurationMillis = breakEnd - breakStart

      // Convert break duration to hours (as a decimal)
      const breakDurationHours = (
        breakDurationMillis /
        (1000 * 60 * 60)
      ).toFixed(2) // Convert milliseconds to hours

      // Update the attendance record with the new break end time and calculated break duration in hours
      const UpdateBreak = await AttendanceModel.findByIdAndUpdate(
        id,
        {
          onBreak,
          breakEnd, // Use camelCase here
          Break_Time: breakDurationHours, // Break_Time in schema remains unchanged
        },
        { new: true } // This returns the updated document
      )

      // Respond with success message and the updated attendance data
      return res.status(200).json({
        message: 'Attendance updated successfully',
        attendance: UpdateBreak,
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
