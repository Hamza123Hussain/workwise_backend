import { KPIModel } from '../../Models/kpi.js'
import { User } from '../../Models/User.js'
import { CalculatePoints } from './Points.js'
// import { PointsGained_BasedOnPriority } from './TargetPriority.js'

export const UpdateKpi = async (req, res) => {
  const { UserId, Targets, AdminID, _id } = req.body

  try {
    // Step 1: Verify Admin Existence
    const existingAdmin = await User.findOne({ _id: AdminID })
    if (!existingAdmin) {
      return res.status(404).json({ message: 'The Admin does not exist' })
    }

    // Step 2: Check if the user exists in the database
    const existingUser = await User.findById(UserId)
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Step 3: Process Targets
    // const UpdatedTarget = PointsGained_BasedOnPriority(Targets) // Update targets based on priority
    const Points = CalculatePoints(UpdatedTarget) // Calculate total points and points gained

    // Step 4: Update KPI Document
    const updatedKPI = await KPIModel.findByIdAndUpdate(
      _id,
      {
        UserId,
        UserName: existingUser.Name,
        UserEmail: existingUser.Email,
        Targets: UpdatedTarget, // Use updated targets
        PointsGained: Points.PointsGained,
        TotalPoints: Points.TotalPoints,
      },
      { new: true } // Return the updated document
    )

    if (!updatedKPI) {
      return res.status(404).json({ message: 'KPI not found' })
    }

    // Step 5: Respond with the updated KPI and success message
    return res.status(200).json({
      message: 'KPI updated successfully',
      //   KPI: updatedKPI,
    })
  } catch (error) {
    // Handle errors
    console.error('Error updating KPI:', error)
    return res.status(500).json({
      message: 'An error occurred while updating the KPI',
      error: error.message,
    })
  }
}
