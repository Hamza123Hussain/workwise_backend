import express from 'express'
import { DB_CONNECTED } from './DB_Connect.js'
import cors from 'cors'
import AuthRouter from './DB/Router/AuthRouter.js'
const app = express()
app.use(express.json())
app.use(cors())
app.use('/Api/Auth', AuthRouter)
DB_CONNECTED()
