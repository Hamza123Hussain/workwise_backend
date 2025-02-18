import mongoose from 'mongoose'
const ChatSchema = new mongoose.Schema({
  UserEmail: { type: String },
  RecipentEmail: { type: String },
  ChatID: { type: String },
  UserID: { type: String }, //
  RecipentID: { type: String },
})
const ChatModel = mongoose.model('ChatIDDetails', ChatSchema)
export default ChatModel
