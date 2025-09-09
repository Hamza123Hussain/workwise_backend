import mongoose from 'mongoose'

const InvoiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  approvalStatus: { type: Boolean, default: false },
  companyName: { type: String, default: '' },
  createdBy: { type: String }, // Optional field for who created the Invoice
  financialYear: { type: String },
})

export const InvoiceModel = mongoose.model('Invoice', InvoiceSchema)
