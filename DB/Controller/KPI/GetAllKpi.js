import { KPIModel } from '../../Models/kpi.js'
import { User } from '../../Models/User.js'

export const GetAllKpi = async (req, res) => {
  const { UserID } = req.query
  try {
    const ExisitngUser = await User.findById(UserID)
    if (!ExisitngUser) {
      res.status(500).json('You are not authorized to use this api')
    }
    const AllKpis = await KPIModel.find()
    res.status(200).json(AllKpis)
  } catch (error) {
    res
      .status(500)
      .json({ Message: 'Some Error Ocurred In Fetching Kpis', error })
  }
}
