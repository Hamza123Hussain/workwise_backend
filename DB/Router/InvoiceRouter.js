import { Router } from 'express'
import {
  getAllInvoices,
  getInvoicesByCompany,
  getInvoicesByStatus,
  getInvoicesByYear,
} from '../Controller/Invoice/GetAllInvoices.js'
import { setInvoiceApproval } from '../Controller/Invoice/UpdateInvoice.js'
import { deleteInvoice } from '../Controller/Invoice/DeleteInvoice.js'
import { createInvoice } from '../Controller/Invoice/CreateInvoice.js'

export const InvoiceRouter = Router()
InvoiceRouter.get('/GetInvoices', getAllInvoices)
InvoiceRouter.get('/GetCompanyInvoices', getInvoicesByCompany)
InvoiceRouter.get('/GetYearWiseInvoices', getInvoicesByYear)
InvoiceRouter.get('/GetInvoicesStatusWise', getInvoicesByStatus)
InvoiceRouter.put('/UpdateInvoiceStatus', setInvoiceApproval)
InvoiceRouter.delete('/DeleteInvoice', deleteInvoice)
InvoiceRouter.post('/CreateInvoice', createInvoice)
