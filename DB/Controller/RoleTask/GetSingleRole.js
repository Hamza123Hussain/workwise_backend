import RoleTasks from '../../Models/RoleTasks.js'
import { User } from '../../Models/User.js'
export const GetARole = async (req, res) => {
  const { UserID, _id } = req.query
  try {
    const ExisitngUser = await User.findById(UserID)
    if (!ExisitngUser) {
      res.status(500).json('You are not authorized to use this api')
    }
    const SingleRole = await RoleTasks.findById(_id)
    res.status(200).json(SingleRole)
  } catch (error) {
    res
      .status(500)
      .json({ Message: 'Some Error Ocurred In Fetching Kpis', error })
  }
}
