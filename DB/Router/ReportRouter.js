import { Router } from 'express'
import { Get_A_Single_Report } from '../Report/GetASingleReport.js'
import { GetAllReports } from '../Report/GetReports.js'
import { CreateReport } from '../Controller/Report/CreateReport.js'

export const ReportRouter = Router()
ReportRouter.get('/UserReport', Get_A_Single_Report)
ReportRouter.get('/AllReports', GetAllReports)
ReportRouter.post('/CreateReport', CreateReport)
