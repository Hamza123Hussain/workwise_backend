import { Router } from 'express'
import { NewAttendance } from '../Controller/Attendance/NewAttendance.js'
import { UpdateAttendance } from '../Controller/Attendance/UpdateAttendance.js'

import { AllUser } from '../Controller/Attendance/AllUserAttendance.js'
import { UserAttendance } from '../Controller/Attendance/UserAttendance.js'

const AttendanceRouter = Router()

AttendanceRouter.post('/NewAttendace', NewAttendance)
AttendanceRouter.post('/UpdateAttendance', UpdateAttendance)
AttendanceRouter.get('/UserAttendance', UserAttendance)
AttendanceRouter.get('/AllAttendance', AllUser)

export default AttendanceRouter
