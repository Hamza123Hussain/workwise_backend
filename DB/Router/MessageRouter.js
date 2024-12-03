import { Router } from 'express'
import { SendMessage } from '../Controller/Messages/SendMessage.js'
import { GetMessages } from '../Controller/Messages/FetchMessage.js'

const MessageRouter = Router()
MessageRouter.post('/SendMessage', SendMessage)
MessageRouter.get('/GetMessages', GetMessages)
export default MessageRouter
