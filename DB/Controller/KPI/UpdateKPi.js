import { KPIModel } from '../../Models/kpi.js'
import { User } from '../../Models/User.js'
import { CalculatePoints } from './Points.js'
import { UpdatingPointsGained } from './UpdatePointsGained.js'

export const UpdateKpi = async (req, res) => {
  const { UserId, Targets, AdminID, _id, TargetID } = req.body

  try {
    // Step 1: Verify Admin Existence
    const existingAdmin = await User.findById(AdminID)
    if (!existingAdmin || AdminID !== 'Hlk8DgN8pKf26WMI2wgP4bCY9oR2') {
      return res
        .status(404)
        .json({ message: 'The Admin does not exist or unauthorized' })
    }

    // Step 2: Check if the user exists in the database
    const existingUser = await User.findById(UserId)
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Step 3: Process Targets and Update Points
    const UpdatedTarget = UpdatingPointsGained(Targets, TargetID) // Update PointsGained based on TargetID
    const Points = CalculatePoints(UpdatedTarget) // Calculate total points and points gained

    // Step 4: Update KPI Document in Database
    const updatedKPI = await KPIModel.findByIdAndUpdate(
      _id,
      {
        UserId,
        UserName: existingUser.Name,
        UserEmail: existingUser.Email,
        Targets: UpdatedTarget, // Updated targets with PointsGained
        PointsGained: Points.PointsGained,
        TotalPoints: Points.TotalPoints,
      },
      { new: true } // Return the updated document
    )

    // Step 5: Handle if KPI was not found
    if (!updatedKPI) {
      return res.status(404).json({ message: 'KPI not found' })
    }

    // Step 6: Respond with success message
    return res.status(200).json({
      message: 'KPI updated successfully',
      updatedKPI,
    })
  } catch (error) {
    // Handle any errors
    console.error('Error updating KPI:', error)
    return res.status(500).json({
      message: 'An error occurred while updating the KPI',
      error: error.message,
    })
  }
}
