import { AttendanceModel } from '../../Models/Attendance.js'
import { User } from '../../Models/User.js'

export const UpdateBreak = async (req, res) => {
  const { Email, id, Break_Time, onBreak } = req.body

  try {
    // Check if the user exists by querying the User model with the email
    const ExistUser = await User.findOne({ Email })

    if (!ExistUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Create an object to hold the fields that need to be updated
    const updateFields = { onBreak } // Always include onBreak

    // Include Break_Start if onBreak is true
    if (onBreak) {
      updateFields.Break_Start = Break_Time // Use Break_Start only if onBreak is true
    }
    // Include Break_End if onBreak is false
    if (!onBreak) {
      updateFields.Break_end = Break_Time // Use Break_End only if onBreak is false
    }

    // Update the attendance record by the provided id
    const updatedAttendance = await AttendanceModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true } // This returns the updated document
    )

    // If no record is found with the given ID, return a 404 error
    if (!updatedAttendance) {
      return res.status(404).json({ message: 'Attendance record not found' })
    }

    // Respond with success message and the updated attendance data
    return res.status(200).json({
      message: 'Attendance updated successfully',
      attendance: updatedAttendance,
    })
  } catch (error) {
    // Catch any errors and return a 500 status code
    return res.status(500).json({ message: error.message })
  }
}
