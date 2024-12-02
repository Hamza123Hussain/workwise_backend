import CandidateModel from '../../Models/Candidates.js'
import { User } from '../../Models/User.js'
export const UpdateACandidate = async (req, res) => {
  const { UserData, Email, _id } = req.body
  try {
    // Check if the user is authenticated (user exists)
    const userExist = await User.findOne({ Email }) // Use findOne instead of find to return a single user
    if (!userExist) {
      return res
        .status(404)
        .json('USER NOT AUTHENTICATED TO EXECUTE THIS FUNCTION')
    }
    // Find the candidate by ID and update
    const updateCandidate = await CandidateModel.findByIdAndUpdate(
      _id,
      { $set: UserData }, // Use $set to update only the fields in UserData
      { new: true } // Return the updated candidate
    )
    // If candidate is not found
    if (!updateCandidate) {
      return res.status(404).json('Candidate not found')
    }
    // Return the updated candidate data
    res.status(200).json(updateCandidate)
  } catch (error) {
    // Log and send an error response
    console.error('Error Updating candidate:', error)
    return res
      .status(500)
      .json({ message: 'Error Updating candidate', error: error.message })
  }
}
