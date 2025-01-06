import { database } from '../../../FireBaseConfig.js'
import { ref, push, set, get } from 'firebase/database'
// Send message route
export const SendMessage = async (req, res) => {
  const { text, userId, recipientId, chatId } = req.body
  // Sanitize chatId to ensure it's a valid Firebase path
  const sanitizedChatId = chatId.replace(/@/g, '-at-').replace(/\./g, '-dot-')
  // Log the incoming request data for debugging
  console.log(req.body)
  // Validate input data
  if (!text || !userId || !recipientId || !sanitizedChatId) {
    return res.status(400).json({
      error: 'Missing required fields: text, userId, recipientId, or chatId.',
    })
  }
  try {
    // Reference to the chat messages in Firebase Realtime Database
    const chatRef = ref(database, `chats/${sanitizedChatId}/messages`)
    // Check if the chat already exists by querying for messages
    const snapshot = await get(chatRef)
    let messageRef
    if (snapshot.exists()) {
      // If chat exists, push a new message to the existing chat
      messageRef = push(chatRef)
    } else {
      // If chat doesn't exist, create a new chat with the first message
      messageRef = push(chatRef)
    }
    // Prepare message data
    const message = {
      text,
      userId,
      timestamp: new Date().getTime(),
      recipientId,
    }
    // Push the message to the chat's 'messages' node
    await set(messageRef, message)
    res.status(201).json({
      message: 'Message sent successfully',
      messageId: messageRef.key, // Return the Firebase message ID (key)
      chatId: sanitizedChatId, // Return the sanitized chat ID
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
