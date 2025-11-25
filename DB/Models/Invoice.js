import mongoose from 'mongoose'

const InvoiceSchema = new mongoose.Schema({
  InvoiceNumber: { type: String, required: true },
  Customer: { type: String, required: true },
  CreatedOn: { type: Date, default: Date.now },
  Status: { type: String, default: '' },
  CreatedBy: { type: String }, // Optional field for who created the Invoice
  FinancialYear: { type: String },
  PaymentMode: { type: String },
  Amount: { type: Number, required: true },
  PaidTo: { type: String },
})

export const InvoiceModel = mongoose.model('Invoice', InvoiceSchema)
