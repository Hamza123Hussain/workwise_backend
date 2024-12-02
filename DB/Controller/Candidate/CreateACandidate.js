import CandidateModel from '../../Models/Candidates.js'
export const CreateCandidate = async (req, res) => {
  const { CandidateData } = req.body
  try {
    // Check if Name and Email are provided
    if (!CandidateData.Name || !CandidateData.Email) {
      return res
        .status(400)
        .json('Name and Email of the Candidate are required')
    }
    // Validate if Email is in correct format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(CandidateData.Email)) {
      return res.status(400).json('Invalid email format')
    }
    // Check if the email already exists in the database
    const existingCandidate = await CandidateModel.findOne({
      Email: CandidateData.Email,
    })
    if (existingCandidate) {
      return res.status(400).json('Candidate with this email already exists')
    }
    // Create a new candidate record
    const NewCandidate = await CandidateModel.create(CandidateData)
    // Send the created candidate's data as the response
    res.status(201).json({
      message: 'Candidate created successfully',
      candidate: NewCandidate,
    })
  } catch (error) {
    // Log and send an error response
    console.error('Error creating candidate:', error)
    return res
      .status(500)
      .json({ message: 'Error creating candidate', error: error.message })
  }
}
