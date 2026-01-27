import { KPIModel } from '../../Models/kpi.js'
import { CalculatePoints } from './Points.js'

/**
 * Update KPI Controller
 * Updates an existing KPI with new targets, hours, and salary
 * Recalculates points automatically
 */
export const UpdateKPI = async (req, res) => {
  const { KPIId } = req.query
  const { Targets, HoursWorked, Salary } = req.body

  try {
    // 1️⃣ Fetch KPI from DB
    const existingKPI = await KPIModel.findById(KPIId)
    if (!existingKPI) {
      return res.status(404).json({ message: 'KPI not found' })
    }

    // 2️⃣ Validate targets
    if (!Targets || !Array.isArray(Targets) || Targets.length === 0) {
      return res
        .status(400)
        .json({ message: 'Targets must be a non-empty array' })
    }

    // 3️⃣ Update targets with points
    const UpdatedTargets = Targets.map((t) => {
      if (!t.TargetName || t.TargetValue < 0)
        throw new Error('Invalid target data')

      // Set TotalPoints based on priority
      let multiplier = 2.5
      if (t.Priority === 'High') multiplier = 10
      else if (t.Priority === 'Medium') multiplier = 5

      t.TotalPoints = multiplier * t.TargetValue

      // Auto calculate PointsGained based on ValueAchieved
      t.PointsGained = t.ValueAchieved
        ? (Math.min(t.ValueAchieved, t.TargetValue) / t.TargetValue) *
          t.TotalPoints
        : 0

      return t
    })

    // 4️⃣ Calculate total points for KPI
    const { TotalPoints, PointsGained } = CalculatePoints(UpdatedTargets)

    // 5️⃣ Update KPI document
    existingKPI.Targets = UpdatedTargets
    if (HoursWorked !== undefined) existingKPI.HoursWorked = HoursWorked
    if (Salary !== undefined) {
      existingKPI.Salary = Salary
      existingKPI.TotalSalary = Salary // optional, for consistency
    }
    existingKPI.TotalPoints = TotalPoints
    existingKPI.PointsGained = PointsGained

    // 6️⃣ Save updated KPI
    const savedKPI = await existingKPI.save()

    return res.status(200).json({
      message: 'KPI updated successfully',
      KPI: savedKPI,
    })
  } catch (error) {
    console.error('Error updating KPI:', error)
    return res.status(500).json({
      message: 'An error occurred while updating the KPI',
      error: error.message,
    })
  }
}
