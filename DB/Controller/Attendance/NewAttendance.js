// AttendanceController.js
import { User } from '../../Models/User.js'
import { AttendanceModel } from '../../Models/Attendance.js'
import { v4 as uuidv4 } from 'uuid' // Importing v4 from uuid
import { getAddressFromCoordinates } from './GetExactLocation.js'

export const NewAttendance = async (req, res) => {
  const { Email, EntryTime, CheckInStatus, location } = req.body
  const randomid = uuidv4() // Generate a unique ID

  try {
    // Check if the user exists by querying the User model with the email
    const ExistUser = await User.findOne({ Email })

    if (ExistUser) {
      // Fetch the address from coordinates
      const address = await getAddressFromCoordinates(
        location.latitude,
        location.longitude
      )

      // Create a new attendance record
      const NewAttendance = await AttendanceModel.create({
        _id: randomid,
        CheckInStatus: CheckInStatus,
        User_ID: ExistUser.id,
        UserData: ExistUser.Name, // Store user ID instead of just email for better referencing
        Email: ExistUser.Email,
        entry: EntryTime, // Assuming EntryTime is in the correct format
        isAbsent: false, // Mark user as present
        currentDate: new Date(), // Store the current date
        latitude: location.latitude,
        longitude: location.longitude,
        location: address, // Use the fetched address
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
    console.error('Error recording attendance:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
