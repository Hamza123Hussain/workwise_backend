import RoleTasks from '../../Models/RoleTasks.js'
import { User } from '../../Models/User.js'

export const GetAllRoles = async (req, res) => {
  const { UserID } = req.query
  try {
    const ExisitngUser = await User.findById(UserID)
    if (!ExisitngUser && ExisitngUser._id !== 'qdyyLorl9WR27GcAxkBbxHO4sWu1') {
      res.status(500).json('You are not authorized to use this api')
    }
    const AllRoles = await RoleTasks.find()
    res.status(200).json(AllRoles)
  } catch (error) {
    res
      .status(500)
      .json({ Message: 'Some Error Ocurred In Fetching Kpis', error })
  }
}
