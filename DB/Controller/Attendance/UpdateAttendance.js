import { AttendanceModel } from '../../Models/Attendance.js'
import { User } from '../../Models/User.js'

export const UpdateAttendance = async (req, res) => {
  const { Email, id, ExitTime } = req.body

  try {
    const user = await User.findOne({ Email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const attendance = await AttendanceModel.findById(id)
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance not found' })
    }

    if (!attendance.CheckInStatus) {
      return res.status(400).json({ message: 'Already checked out' })
    }

    const entryTime = new Date(attendance.entry)
    const exitTime = new Date(ExitTime)

    const hoursWorked =
      (exitTime.getTime() - entryTime.getTime()) / (1000 * 60 * 60)

    const updated = await AttendanceModel.findByIdAndUpdate(
      id,
      {
        exit: exitTime,
        CheckInStatus: false,
        Hours_Worked: hoursWorked,
      },
      { new: true }
    )

    return res.status(200).json({
      message: 'Checked out successfully',
      attendance: updated,
      hoursWorked,
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}
