import { KPIModel } from '../../Models/kpi.js'
import { User } from '../../Models/User.js'
import { CalculatePoints } from './Points.js'
import { PointsGained_BasedOnPriority } from './TargetPrioirty.js'

export const KPIUpdater = async (req, res) => {
  const { UserId, Targets } = req.body

  try {
    // 1. Check if the user exists
    const existingUser = await User.findById(UserId)
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // 2. Find existing KPI for this user
    const existingKPI = await KPIModel.findOne({ UserId })
    if (!existingKPI) {
      return res.status(404).json({ message: 'KPI not found for this user' })
    }

    // 3. Update targets with priority points
    const UpdatedTarget = PointsGained_BasedOnPriority(Targets)

    // 4. Recalculate points
    const Points = CalculatePoints(UpdatedTarget)

    // 5. Update KPI fields
    existingKPI.Targets = UpdatedTarget
    existingKPI.PointsGained = Points.PointsGained
    existingKPI.TotalPoints = Points.TotalPoints

    // Optional: Update other fields if needed
    // existingKPI.UpdatedAt = new Date()

    // 6. Save changes
    const updatedKPI = await existingKPI.save()

    // 7. Return success
    return res.status(200).json({
      message: 'KPI updated successfully',
      KPI: updatedKPI,
      UpdatedTarget,
    })
  } catch (error) {
    console.error('Error updating KPI:', error)
    return res.status(500).json({
      message: 'An error occurred while updating the KPI',
      error: error.message,
    })
  }
}
