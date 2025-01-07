import RoleTasks from '../../Models/RoleTasks.js'
import { User } from '../../Models/User.js'
import { PointsGained_BasedOnPriority } from './PointsBasedonpriority.js'

export const UpdateRoleTasks = async (req, res) => {
  const { RoleTasksId, UserId, Tasks = [] } = req.body // Extract inputs from the request body
  try {
    // Step 1: Check if the user exists in the database
    const existingUser = await User.findById(UserId)
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' }) // Send a 404 response if the user doesn't exist
    }

    // Step 2: Check if the RoleTasks document exists
    const existingRoleTasks = await RoleTasks.findById(RoleTasksId)
    if (!existingRoleTasks) {
      return res.status(404).json({ message: 'Role tasks not found' }) // Send a 404 response if the RoleTasks document doesn't exist
    }

    // Step 3: Process tasks with priority points
    const updatedTasks = PointsGained_BasedOnPriority(Tasks)

    // Step 4: Update or add new tasks
    updatedTasks.forEach((newTask) => {
      const existingTask = existingRoleTasks.Tasks.find(
        (task) => task.TaskName === newTask.TaskName
      )
      if (existingTask) {
        // Update existing task properties
        existingTask.Priority = newTask.Priority
        existingTask.Completed = newTask.Completed
      } else {
        // Add new task if it doesn't exist
        existingRoleTasks.Tasks.push(newTask)
      }
    })

    // Step 5: Update UsersAssigned if the user is not already assigned
    const userAlreadyAssigned = existingRoleTasks.UsersAssigned.find(
      (user) => user.UserId === UserId
    )
    if (!userAlreadyAssigned) {
      existingRoleTasks.UsersAssigned.push({
        UserId,
        UserEmail: existingUser.Email,
        UserName: existingUser.Name,
      })
    }

    // Step 6: Save the updated RoleTasks document
    const updatedRoleTasks = await RoleTasks.findByIdAndUpdate(
      RoleTasksId,
      {
        $set: {
          Tasks: existingRoleTasks.Tasks,
          UsersAssigned: existingRoleTasks.UsersAssigned,
        },
      },
      { new: true } // Return the updated document
    )

    // Step 7: Respond with the updated RoleTasks and success message
    return res.status(200).json({
      message: 'Role tasks updated successfully',
      roleTasks: updatedRoleTasks, // Return the updated RoleTasks document
    })
  } catch (error) {
    console.error('Error updating RoleTasks:', error) // Log the error for debugging
    // Send a 500 error response with the error details
    return res.status(500).json({
      message: 'An error occurred while updating the RoleTasks',
      error: error.message, // Include the specific error message for better debugging
    })
  }
}
