import RoleTasks from '../../Models/RoleTasks.js'
import { User } from '../../Models/User.js'
import { PointsGained_BasedOnPriority } from './PointsBasedonpriority.js'
export const CreateRoleTasks = async (req, res) => {
  const { UserId, RoleName, Tasks = [] } = req.body // Extract inputs from the request body with a default empty array for Tasks
  try {
    // Step 1: Check if the user exists in the database
    const existingUser = await User.findById(UserId)
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' }) // Send a 404 response if the user doesn't exist
    }
    const UpdatedTasks = PointsGained_BasedOnPriority(Tasks)
    // Step 2: Create a new RoleTasks document with the provided and derived data
    const newRoleTasks = new RoleTasks({
      RoleName,
      Tasks: UpdatedTasks,
      UsersAssigned: [
        { UserId, UserEmail: existingUser.Email, UserName: existingUser.Name },
      ],
    })
    // Step 3: Save the new RoleTasks document to the database
    const savedRoleTasks = await newRoleTasks.save()
    // Step 4: Respond with the created RoleTasks and success message
    return res.status(201).json({
      message: 'Role tasks created successfully',
      roleTasks: savedRoleTasks, // Return the newly created RoleTasks document
    })
  } catch (error) {
    console.error('Error creating RoleTasks:', error) // Log the error for debugging
    // Send a 500 error response with the error details
    return res.status(500).json({
      message: 'An error occurred while creating the RoleTasks',
      error: error.message, // Include the specific error message for better debugging
    })
  }
}
