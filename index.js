import express from 'express'
import { DB_CONNECTED } from './DB_Connect.js'
import cors from 'cors'
import AuthRouter from './DB/Router/AuthRouter.js'
import TaskRouter from './DB/Router/TaskRouter.js'
import AttendanceRouter from './DB/Router/AttendanceRouter.js'
import { PORT } from './Config.js'
import OtpRouter from './DB/Router/OtpRouter.js'
import { ReportRouter } from './DB/Router/ReportRouter.js'
import { CandidateRouter } from './DB/Router/CandidateRouter.js'
import { MeetingRouter } from './DB/Router/MeetingRouter.js'
import MessageRouter from './DB/Router/MessageRouter.js'
const app = express()
app.use(express.json())
const corsOptions = {
  origin: '*', // Allow requests from any origin; adjust as needed for security
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only GET and POST methods
}
app.use(cors(corsOptions))
app.use('/Api/Auth', AuthRouter)
app.use('/Api/Attendance', AttendanceRouter)
app.use('/Api/Task', TaskRouter)
app.use('/Api/Otp', OtpRouter)
app.use('/Api/Report', ReportRouter)
app.use('/Api/Candidate', CandidateRouter)
app.use('/Api/Meeting', MeetingRouter)
app.use('/Api/Message', MessageRouter)
DB_CONNECTED()
app.listen(PORT, () => {
  console.log('port is on')
})
