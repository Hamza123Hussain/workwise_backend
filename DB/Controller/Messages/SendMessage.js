import { database } from '../../../FireBaseConfig.js'
import { ref, push, set, get } from 'firebase/database'
import ChatModel from '../../Models/ChatModel.js'

// Send message route
export const SendMessage = async (req, res) => {
  const { text, UserEmail, RecipentEmail, UserID, RecipentID } = req.body

  // Validate required fields
  if (!text || !UserID || !RecipentID) {
    return res.status(400).json({
      error: 'Missing required fields: text, UserID, RecipentID, or text.',
    })
  }

  try {
    let chatID = ''

    // Check if an existing chat exists between the two users
    let existingChat = await ChatModel.findOne({
      $or: [
        { UserEmail, RecipentEmail },
        { UserEmail: RecipentEmail, RecipentEmail: UserEmail },
      ],
    })

    if (existingChat) {
      chatID = existingChat.ChatID
    } else {
      // Create a new chat record in MongoDB
      const newChat = await ChatModel.create({
        UserEmail,
        RecipentEmail,
        UserID,
        RecipentID,
        ChatID: `${UserID}-${RecipentID}`,
      })
      chatID = newChat.ChatID
    }

    // Reference to the chat messages in Firebase Realtime Database
    const chatRef = ref(database, `chats/${chatID}/messages`)

    // Push a new message to Firebase
    const messageRef = push(chatRef)
    const message = {
      text,
      UserID,
      RecipentID,
      timestamp: Date.now(), // Current timestamp
    }

    await set(messageRef, message)

    // Return success response
    res.status(201).json({
      message: 'Message sent successfully',
      messageId: messageRef.key, // Firebase message ID
      chatId: chatID, // The chat ID
    })
  } catch (error) {
    console.error('Error sending message:', error)
    res.status(500).json({ error: 'Server error, please try again later.' })
  }
}
