import { InvoiceModel } from '../../Models/Invoice.js'
import { User } from '../../Models/User.js'

export const setInvoiceApproval = async (req, res) => {
  const { Userid, id, status } = req.query

  const existingUser = await User.findById(Userid)

  try {
    if (!existingUser) {
      return res.status(404).json({
        Message: 'Not Authorized To Acess This Route',
      })
    }
    const updatedInvoice = await InvoiceModel.findByIdAndUpdate(
      id,
      { ApprovalStatus: status },
      { new: true }
    )

    if (!updatedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' })
    }

    return res.status(200).json({
      message: `Invoice ${status ? 'approved' : 'rejected'} successfully`,
      invoice: updatedInvoice,
    })
  } catch (error) {
    console.error('Error updating approval status:', error)
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message })
  }
}
