import Notice from '../../Models/Notice.js'

export const GetAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 }) // Most recent first
    res.status(200).json(notices)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
