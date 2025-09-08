import mongoose from 'mongoose'

const InvoiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  ApprovalStatus: { type: Boolean, default: false },
  CompanyName: { type: String, default: '' },
  CreatedBy: { type: String }, // Optional field for who created the Invoice
  FinancialYear: { type: String },
})

export const InvoiceModel = mongoose.model('Invoice', InvoiceSchema)
