import { Router } from 'express'
import { NewAttendance } from '../Controller/Attendance/NewAttendance.js'
import { UpdateAttendance } from '../Controller/Attendance/UpdateAttendance.js'
import { AllUser } from '../Controller/Attendance/GetAttendance.js'

const TimeRouter = Router()

TimeRouter.post('/NewAttendace', NewAttendance)
TimeRouter.post('/UpdateAttendance', UpdateAttendance)
TimeRouter.get('/AllUserAttendance', AllUser)

export default TimeRouter
