import RoleTasks from '../../Models/RoleTasks.js'
import { User } from '../../Models/User.js'

export const DeleteARoleTask = async (req, res) => {
  const { UserID, RoleTasksId } = req.query // Retrieve UserID and RoleTasksId from query parameters

  try {
    // Step 1: Check if the user exists (Authorization check)
    const existingUser = await User.findById(UserID)
    if (!existingUser) {
      return res
        .status(401) // Unauthorized if the user is not found
        .json({ message: 'You are not authorized to use this API' })
    }

    // Step 2: Find and delete the RoleTasks document
    const deletedRoleTask = await RoleTasks.findByIdAndDelete(RoleTasksId)
    if (!deletedRoleTask) {
      return res.status(404).json({ message: 'Role task not found' })
    }

    // Step 3: Respond with the deleted document and success message
    return res.status(200).json({
      message: 'Role task deleted successfully',
      deletedRoleTask, // Send the deleted RoleTask as part of the response
    })
  } catch (error) {
    // Step 4: Handle errors and respond with a generic message
    console.error('Error deleting Role Task:', error)
    return res.status(500).json({
      message: 'An error occurred while deleting the Role Task',
      error: error.message, // Include the specific error message for debugging
    })
  }
}
