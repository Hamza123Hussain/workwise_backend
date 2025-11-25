import { InvoiceModel } from '../../Models/Invoice.js'
import { User } from '../../Models/User.js'
export const getAllInvoices = async (req, res) => {
  const { Userid } = req.query
  const existingUser = await User.findById(Userid)
  try {
    if (!existingUser) {
      return res.status(404).json({
        Message: 'Not Authorized To Acess This Route',
      })
    }
    const invoices = await InvoiceModel.find().sort({
      CreatedOn: -1,
    }) // latest first
    return res.status(200).json(invoices)
  } catch (error) {
    console.error('Error fetching invoices:', error)
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message })
  }
}
export const getInvoiceById = async (req, res) => {
  const { id, Userid } = req.query
  const existingUser = await User.findById(Userid)
  if (!existingUser) {
    return res.status(404).json({
      Message: 'Not Authorized To Acess This Route',
    })
  }
  try {
    const invoice = await InvoiceModel.findById(id)
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' })
    }
    return res.status(200).json(invoice)
  } catch (error) {
    console.error('Error fetching invoice:', error)
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message })
  }
}
export const getInvoicesByCompany = async (req, res) => {
  const { Userid, companyName } = req.query

  const existingUser = await User.findById(Userid)

  try {
    if (!existingUser) {
      return res.status(404).json({
        Message: 'Not Authorized To Acess This Route',
      })
    }
    const invoices = await InvoiceModel.find({ companyName: companyName })

    return res.status(200).json(invoices)
  } catch (error) {
    console.error('Error fetching invoices by company:', error)
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message })
  }
}
export const getInvoicesByYear = async (req, res) => {
  const { Userid, Year } = req.query

  const existingUser = await User.findById(Userid)

  try {
    if (!existingUser) {
      return res.status(404).json({
        Message: 'Not Authorized To Acess This Route',
      })
    }
    const invoices = await InvoiceModel.find({ financialYear: Year })

    return res.status(200).json(invoices)
  } catch (error) {
    console.error('Error fetching invoices by company:', error)
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message })
  }
}

export const getInvoicesByStatus = async (req, res) => {
  const { Userid, Status } = req.query

  const existingUser = await User.findById(Userid)

  try {
    if (!existingUser) {
      return res.status(404).json({
        Message: 'Not Authorized To Acess This Route',
      })
    }
    const invoices = await InvoiceModel.find({ approvalStatus: Status })

    return res.status(200).json(invoices)
  } catch (error) {
    console.error('Error fetching invoices by company:', error)
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message })
  }
}
