import RoleTasks from '../../Models/RoleTasks.js'
import { User } from '../../Models/User.js'

export const GetARole = async (req, res) => {
  const { UserID } = req.query // Extract UserID from query parameters

  try {
    // Step 1: Check if the user exists
    const existingUser = await User.findById(UserID)
    if (!existingUser) {
      return res
        .status(401)
        .json({ message: 'You are not authorized to use this API' })
    }

    // Step 2: Find the role document with the matching UserID in UsersAssigned
    const singleRole = await RoleTasks.findOne({
      'UsersAssigned.UserId': UserID, // Match the UserId within the UsersAssigned array
    })

    if (!singleRole) {
      return res.status(404).json({ message: 'No role found for this user' })
    }

    // Step 3: Return the matched role document
    res.status(200).json({
      message: 'Role fetched successfully',
      data: singleRole,
    })
  } catch (error) {
    console.error('Error fetching role:', error)
    res.status(500).json({
      message: 'Some error occurred while fetching the role',
      error: error.message,
    })
  }
}
