import RoleTasks from '../../Models/RoleTasks.js'
import { User } from '../../Models/User.js'

export const GetARoleByName = async (req, res) => {
  const { UserName } = req.query // Extract UserName from query parameters

  try {
    // Step 1: Check if the user exists
    const existingUser = await User.findOne({ Name: UserName })
    if (!existingUser) {
      return res
        .status(401)
        .json({ message: 'You are not authorized to use this API' })
    }

    // Step 2: Find the role document with the matching UserName in UsersAssigned
    const singleRole = await RoleTasks.findOne({
      'UsersAssigned.UserName': UserName, // Match the UserName within the UsersAssigned array
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
