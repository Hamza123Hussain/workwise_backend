import CandidateModel from '../../Models/Candidates.js'
import { User } from '../../Models/User.js'
export const GetCandidates = async (req, res) => {
  const { Email } = req.params
  try {
    const UserExist = await User.find({ Email })
    if (UserExist) {
      const CandidatesFound = await CandidateModel.find()
      if (CandidatesFound) {
        res.status(200).json(CandidatesFound)
      } else {
        res.status(404).json('No Candidates Has Been Found.')
      }
    }
    res.status(404).json('User Not Authenticated To Acess This')
  } catch (error) {
    // Log and send an error response
    console.error('Error creating candidate:', error)
    return res
      .status(500)
      .json({ message: 'Error creating candidate', error: error.message })
  }
}
