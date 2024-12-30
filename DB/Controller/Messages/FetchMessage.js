import { ref, get } from 'firebase/database'
import { database } from '../../../FireBaseConfig.js'
export const GetMessages = async (req, res) => {
  const { chatId } = req.query // Get chatId from URL parameters
  try {
    // Reference to the messages of the specific chat
    const chatRef = ref(database, `chats/${chatId}/messages`)
    // Get the snapshot of the messages
    const snapshot = await get(chatRef)
    if (snapshot.exists()) {
      // Convert the messages object to an array
      const messagesObject = snapshot.val()
      const messagesArray = Object.entries(messagesObject).map(
        ([id, data]) => ({
          id, // Include the Firebase key as `id`
          ...data, // Spread the rest of the message properties
        })
      )
      // Respond with the transformed array
      res.status(200).json({
        chatId,
        messages: messagesArray,
      })
    } else {
      // If no messages exist, return a message indicating so
      res.status(404).json({
        message: `No messages found for chat ID: ${chatId}.`,
      })
    }
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch messages: ' + error.message,
    })
  }
}
