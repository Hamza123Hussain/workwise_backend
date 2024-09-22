import { Router } from 'express'
import { upload } from '../../MulterConfig.js'
import { RegisterUser } from '../Controller/Auth/SignUp.js'
import { Login } from '../Controller/Auth/SignIn.js'
import { Signout } from '../Controller/Auth/SignOut.js'
import { ResetPass } from '../Controller/Auth/ResetPass.js'

const AuthRouter = Router()

AuthRouter.post('/Signup', upload.single('Image'), RegisterUser)
AuthRouter.get('/SignIn', Login)
AuthRouter.get('/Signout', Signout)
AuthRouter.post('/Reset', ResetPass)
export default AuthRouter
