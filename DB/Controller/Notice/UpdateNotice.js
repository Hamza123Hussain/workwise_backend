import Notice from '../../Models/Notice.js'

export const UpdateNotice = async (req, res) => {
  try {
    const { title, description, author } = req.body
    const updatedNotice = await Notice.findByIdAndUpdate(
      req.params.id,
      { title, description, author },
      { new: true } // Return the updated document
    )
    if (!updatedNotice) {
      return res.status(404).json({ message: 'Notice not found' })
    }
    res.status(200).json(updatedNotice)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
