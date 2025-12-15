import { Router } from 'express'
import { CheckIn } from '../Controller/Attendance/NewAttendance.js'
import { CheckOut } from '../Controller/Attendance/UpdateAttendance.js'

import { AllUser } from '../Controller/Attendance/AllUserAttendance.js'
import { UserAttendance } from '../Controller/Attendance/UserAttendance.js'
import { CurrentAttendance } from '../Controller/Attendance/CurrentAttendance.js'
import { UpdateBreak } from '../Controller/Attendance/UpdateBreakStatus.js'
import { GetMonthlyHoursWorked } from '../Controller/Attendance/GetWorkedHours.js'

const AttendanceRouter = Router()

AttendanceRouter.post('/NewAttendace', CheckIn)
AttendanceRouter.put('/UpdateAttendance', CheckOut)
AttendanceRouter.post('/Updatebreak', UpdateBreak)
AttendanceRouter.get('/UserAttendance', UserAttendance)
AttendanceRouter.get('/AllAttendance', AllUser)
AttendanceRouter.get('/CurrentAttendance', CurrentAttendance)
AttendanceRouter.get('/GetHoursWorked', GetMonthlyHoursWorked)
export default AttendanceRouter
