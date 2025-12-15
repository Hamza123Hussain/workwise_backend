import { AttendanceModel } from '../../Models/Attendance.js'

export const CheckOut = async (req, res) => {
  const { id } = req.body // attendanceId

  try {
    const attendance = await AttendanceModel.findById(id)
    if (!attendance)
      return res.status(404).json({ message: 'Attendance not found' })
    if (!attendance.CheckInStatus)
      return res.status(400).json({ message: 'Already checked out' })

    const exitTime = new Date()
    const hoursWorked =
      (exitTime.getTime() - new Date(attendance.entry).getTime()) /
      (1000 * 60 * 60)

    attendance.exit = exitTime
    attendance.Hours_Worked = hoursWorked
    attendance.CheckInStatus = false
    await attendance.save()

    return res.status(200).json({
      message: 'Checked out',
      attendance: {
        exit: attendance.exit,
        Hours_Worked: attendance.Hours_Worked,
      },
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}
