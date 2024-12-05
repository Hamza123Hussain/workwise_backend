import Notice from '../../Models/Notice.js'

// Delete a notice
export const DeleteNotice = async (req, res) => {
  try {
    const deletedNotice = await Notice.findByIdAndDelete(req.params.id)
    if (!deletedNotice) {
      return res.status(404).json({ message: 'Notice not found' })
    }
    res.status(200).json({ message: 'Notice deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
