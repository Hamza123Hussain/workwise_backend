import { Router } from 'express'
import { GetAllNotices } from '../Controller/Notice/GetAllNotices.js'
import { GetSingleNotice } from '../Controller/Notice/GetNotice.js'
import { CreateNotice } from '../Controller/Notice/CreateNotice.js'
import { UpdateNotice } from '../Controller/Notice/UpdateNotice.js'
import { DeleteNotice } from '../Controller/Notice/DeleteNotice.js'
const NoticeRouter = Router()
NoticeRouter.get('/GetAllNotices', GetAllNotices)
NoticeRouter.get('/GetNotice', GetSingleNotice)
NoticeRouter.post('/NewNotice', CreateNotice)
NoticeRouter.put('/UpdateNotice', UpdateNotice)
NoticeRouter.delete('/DeleteNotice', DeleteNotice)
export default NoticeRouter
