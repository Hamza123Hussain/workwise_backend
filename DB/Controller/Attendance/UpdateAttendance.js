import { TimeModel } from '../../Models/Time.js'
import User from '../../Models/User.js'

export const UpdateAttendance = async (req, res) => {
  const { Email, id, ExitTime } = req.body

  try {
    // Check if the user exists by querying the User model with the email
    const ExistUser = await User.findOne({ Email })

    if (ExistUser) {
      // Update the attendance record by the provided id
      const UpdateAttendance = await TimeModel.findByIdAndUpdate(
        id,
        {
          Exit: ExitTime, // Make sure "Exit" matches the schema field name
        },
        { new: true } // This returns the updated document
      )

      // If no record is found with the given ID, return a 404 error
      if (!UpdateAttendance) {
        return res.status(404).json({ message: 'Attendance record not found' })
      }

      // Respond with success message and the updated attendance data
      return res.status(200).json({
        message: 'Attendance updated successfully',
        attendance: UpdateAttendance,
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
