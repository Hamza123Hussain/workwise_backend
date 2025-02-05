import { KPIModel } from '../../Models/kpi.js'
import { User } from '../../Models/User.js'
import { CalculatePoints } from './Points.js'
import { UpdatingPointsGained } from './UpdatePointsGained.js'

export const UpdateKpi = async (req, res) => {
  try {
    const { UserId, _id, TargetName } = req.body

    // Step 1: Validate Input
    if (!UserId || !_id || !TargetName) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Step 2: Verify User Existence
    const existingUser = await User.findById(UserId)
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Step 3: Fetch KPI Document
    const UserKpi = await KPIModel.findById(_id)
    if (!UserKpi) {
      return res.status(404).json({ message: 'KPI not found' })
    }

    // Step 4: Process Targets and Calculate Points
    const UpdatedTarget = UpdatingPointsGained(UserKpi.Targets, TargetName)
    const { PointsGained, TotalPoints } = CalculatePoints(UpdatedTarget)

    // Step 5: Update KPI Document in Database
    const updatedKPI = await KPIModel.findByIdAndUpdate(
      _id,
      {
        UserId,
        UserName: existingUser.Name,
        UserEmail: existingUser.Email,
        Targets: UpdatedTarget,
        PointsGained,
        TotalPoints,
      },
      { new: true }
    )

    // Step 6: Respond with Success Message
    return res.status(200).json({
      message: 'KPI updated successfully',
      updatedKPI,
    })
  } catch (error) {
    console.error('Error updating KPI:', error)
    return res.status(500).json({
      message: 'An error occurred while updating the KPI',
      error: error.message,
    })
  }
}
