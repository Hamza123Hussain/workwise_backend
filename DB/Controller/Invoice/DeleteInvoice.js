import { InvoiceModel } from '../../Models/Invoice.js'
import { User } from '../../Models/User.js'

export const deleteInvoice = async (req, res) => {
  const { Userid, id } = req.query

  const existingUser = await User.findById(Userid)

  try {
    if (!existingUser) {
      return res.status(404).json({
        Message: 'Not Authorized To Acess This Route',
      })
    }
    const deletedInvoice = await InvoiceModel.findByIdAndDelete(id)

    if (!deletedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' })
    }

    return res.status(200).json({ message: 'Invoice deleted successfully' })
  } catch (error) {
    console.error('Error deleting invoice:', error)
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message })
  }
}
