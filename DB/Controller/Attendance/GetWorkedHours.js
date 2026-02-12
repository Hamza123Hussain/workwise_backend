import { AttendanceModel } from '../../Models/Attendance.js'
import { KPIModel } from '../../Models/kpi.js'
export const GetMonthlyHoursWorked = async (req, res) => {
  const { UserId } = req.query
  try {
    // 1. Define Date Range (Current Month)
    const currentDate = new Date()
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    )
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    )
    // 2. Fetch Attendance Records
    const monthlyAttendance = await AttendanceModel.find({
      User_ID: UserId,
      entry: { $gte: startOfMonth, $lte: endOfMonth },
    })
    // If no records, we still want to set KPI hours to 0 or return
    const totalHoursWorked = monthlyAttendance.reduce((total, record) => {
      return total + (record.Hours_Worked || 0)
    }, 0)
    // 3. Update the KPI Model with the calculated hours
    // We use findOneAndUpdate so it works even if other KPI fields aren't yet initialized
    const updatedKpi = await KPIModel.findOneAndUpdate(
      { UserId: UserId },
      { $set: { HoursWorked: totalHoursWorked } },
      { new: true }, // returns the updated document
    )
    if (!updatedKpi) {
      // Logic: If the KPI record doesn't exist yet, you might want to log it
      // or simply proceed. Here we return 404 if the user doesn't have a KPI profile.
      return res.status(404).json({
        message: 'Hours calculated but KPI record for this user was not found.',
        HoursWorked: totalHoursWorked,
      })
    }
    // 4. Respond with the total hours worked and confirmation of KPI update
    return res.status(200).json({
      message: 'Monthly hours calculated and KPI updated successfully',
      HoursWorked: totalHoursWorked,
      KpiStatus: 'Updated',
    })
  } catch (error) {
    console.error('Error in GetMonthlyHoursWorked:', error)
    return res.status(500).json({
      message: 'An error occurred',
      error: error.message,
    })
  }
}
