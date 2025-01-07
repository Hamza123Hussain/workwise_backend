import { KPIModel } from '../../Models/kpi.js'
import { User } from '../../Models/User.js'

export const DeleteAKPI = async (req, res) => {
  const { UserID, _id } = req.query // Retrieve UserID and KPI ID from query parameters

  try {
    // Step 1: Check if the user exists (Authorization check)
    const existingUser = await User.findById(UserID)
    if (!existingUser) {
      return res
        .status(401) // Unauthorized if user is not found
        .json({ message: 'You are not authorized to use this API' })
    }

    // Step 2: Find and delete the KPI document
    const deletedKPI = await KPIModel.findByIdAndDelete(_id)
    if (!deletedKPI) {
      return res.status(404).json({ message: 'KPI not found' })
    }

    // Step 3: Respond with the deleted document and success message
    return res.status(200).json({
      message: 'KPI deleted successfully',
      deletedKPI, // Send the deleted KPI as part of the response
    })
  } catch (error) {
    // Step 4: Handle errors and respond with a generic message
    console.error('Error deleting KPI:', error)
    return res.status(500).json({
      message: 'An error occurred while deleting the KPI',
      error: error.message, // Include the specific error message for debugging
    })
  }
}
