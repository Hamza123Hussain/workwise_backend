import CandidateModel from '../../Models/Candidates.js'
import { User } from '../../Models/User.js'

export const GetCandidate = async (req, res) => {
  const { _id, Email } = req.body
  try {
    const UserExist = await User.find({ Email })
    if (UserExist) {
      const CandidateFound = await CandidateModel.find({ _id })
      if (CandidateFound) {
        res.status(200).json(CandidateFound)
      } else {
        res.status(404).json('No Candidate Has Been Found.')
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
