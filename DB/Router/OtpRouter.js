import { Router } from 'express'
import { VerifyOtp } from '../Controller/Otp/verifyOtp.js'
import { SendOtp } from '../Controller/Otp/SendOtp.js'
const OtpRouter = Router()

OtpRouter.post('/SendOtp', SendOtp)
OtpRouter.post('/VerifyOtp', VerifyOtp)

export default OtpRouter
