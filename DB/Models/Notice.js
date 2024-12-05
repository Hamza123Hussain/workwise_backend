import mongoose from 'mongoose'

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: String, required: false, default: 'ADMIN' }, // Optional field for who created the notice
})

const Notice = mongoose.model('Notice', NoticeSchema)

export default Notice
