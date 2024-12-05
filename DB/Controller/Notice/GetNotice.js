import Notice from '../../Models/Notice.js'

export const GetSingleNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.query.id)
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' })
    }
    res.status(200).json(notice)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
