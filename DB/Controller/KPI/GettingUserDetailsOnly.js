import { KPIModel } from '../../Models/kpi.js'
import { User } from '../../Models/User.js'

export const GetUserDetailsOnly = async (req, res) => {
  const { UserID } = req.query
  try {
    const ExisitngUser = await User.findById(UserID)
    if (!ExisitngUser) {
      res.status(500).json('You are not authorized to use this api')
    }
    const users = await KPIModel.find({}, 'UserId UserEmail UserName')

    // Check if users exist
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' })
    }
    const WithoutExisitingUser = users.filter((user) => user.UserId !== UserID)
    res.status(200).json(WithoutExisitingUser)
  } catch (error) {
    res
      .status(500)
      .json({ Message: 'Some Error Ocurred In Fetching Kpis', error })
  }
}
