import Notice from '../../Models/Notice.js'

// Create a notice
export const CreateNotice = async (req, res) => {
  try {
    const { title, description, author } = req.body
    const notice = new Notice({ title, description, author })
    await notice.save()
    res.status(201).json(notice)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
