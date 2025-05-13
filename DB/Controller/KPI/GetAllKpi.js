import { KPIModel } from '../../Models/kpi.js'
export const GetAllKpi = async (req, res) => {
  const { UserEmail } = req.query
  try {
    if (
      !UserEmail === 'gptprompts87@gmail.com' ||
      !UserEmail === 'globalgrads.org@gmail.com' ||
      !UserEmail === 'octtoppus1@gmail.com'
    ) {
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
