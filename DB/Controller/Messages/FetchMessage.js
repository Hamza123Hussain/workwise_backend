import { ref, get } from 'firebase/database'
import { database } from '../../../FireBaseConfig.js'
import ChatModel from '../../Models/ChatModel.js'
export const GetMessages = async (req, res) => {
  const { UserID, RecipentID } = req.query // Get chatId from URL parameters
  const ExistingChat = await ChatModel.findOne({
    $or: [
      { UserID, RecipentID },
      { UserID: RecipentID, RecipentID: UserID },
    ],
  })
  if (!ExistingChat) {
    return res.status(404).json('NO CHATS FOUND FOR THIS USER')
  }
  try {
    // Reference to the messages of the specific chat
    const chatRef = ref(database, `chats/${ExistingChat.ChatID}/messages`)
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
        messages: messagesArray,
      })
    } else {
      // If no messages exist, return a message indicating so
      res.status(404).json({
        message: `No messages found for chat ID: ${ExistingChat.ChatID}.`,
      })
    }
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch messages: ' + error.message,
    })
  }
}
