import express from 'express'
import { DB_CONNECTED } from './DB_Connect.js'
import cors from 'cors'
import AuthRouter from './DB/Router/AuthRouter.js'
import TimeRouter from './DB/Router/TimeRouter.js'
const app = express()
app.use(express.json())
app.use(cors())
app.use('/Api/Auth', AuthRouter)
app.use('/Api/Time', TimeRouter)
DB_CONNECTED()
app.listen(8000, () => {
  console.log('port is on')
})
