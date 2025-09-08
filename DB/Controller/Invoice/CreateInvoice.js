import { InvoiceModel } from '../../Models/Invoice.js'
import { User } from '../../Models/User.js'

export const createInvoice = async (req, res) => {
  const { Userid, data } = req.body

  const existingUser = await User.findById(Userid)

  try {
    if (!existingUser) {
      return res.status(404).json({
        Message: 'Not Authorized To Acess This Route',
      })
    }

    const invoice = new InvoiceModel(data) // request body should have title, description, etc.
    const savedInvoice = await invoice.save()

    return res.status(201).json({
      message: 'Invoice created successfully',
      invoice: savedInvoice,
    })
  } catch (error) {
    console.error('Error creating invoice:', error)
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message })
  }
}
