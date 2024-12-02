import { Report } from '../Models/Report.js'
import { User } from '../Models/User.js'

export const Get_A_Single_Report = async (req, res) => {
  const { email, name } = req.body
  try {
    const UserAcess = await User.findOne({ Email: email, Name: name })
    if (UserAcess) {
      const GetUserReport = await Report.find({ UserName: name })
      res.status(200).json(GetUserReport)
    } else {
      res.status(400).json({ Message: 'THIS CAN ONLY BE ACCESSED BY THE USER' })
    }
  } catch (error) {
    // Catch any errors and return a 500 status code
    return res.status(500).json({ message: error.message })
  }
}
