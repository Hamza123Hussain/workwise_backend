import { Report } from '../Models/Report.js'
import { User } from '../Models/User.js'

export const GetAllReports = async (req, res) => {
  const { email } = req.body
  try {
    const AdminAcess = await User.findOne({ Email: email })
    if (AdminAcess && AdminAcess.Email === 'octtoppus1@gmail.com') {
      const GetAllReports = await Report.find()
      res.status(200).json(GetAllReports)
    } else {
      res.status(400).json({ Message: 'THIS CAN ONLY BE ACCESSED BY THE USER' })
    }
  } catch (error) {
    // Catch any errors and return a 500 status code
    return res.status(500).json({ message: error.message })
  }
}
