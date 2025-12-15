import { AttendanceModel } from '../../Models/Attendance.js'
import { User } from '../../Models/User.js'

export const CheckIn = async (req, res) => {
  const { Email, User_ID, UserData } = req.body
  try {
    const user = await User.findOne({ Email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const now = new Date()
    const newAttendance = await AttendanceModel.create({
      UserData,
      User_ID,
      Email,
      entry: now,
      currentDate: now,
      CheckInStatus: true,
      isAbsent: false,
      onBreak: false,
      Hours_Worked: 0,
      Break_Time: 0,
    })

    return res
      .status(201)
      .json({ message: 'Checked in', attendance: newAttendance })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}
