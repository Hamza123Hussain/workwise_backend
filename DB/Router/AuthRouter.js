import { Router } from 'express'
import { upload } from '../../MulterConfig.js'

const AuthRouter = Router()

AuthRouter.post('/Signup', upload.single('Image'))
AuthRouter.get('/SignIn')
AuthRouter.get('/Signout')
AuthRouter.post('/Reset')
export default AuthRouter
