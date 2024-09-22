import dotenv from 'dotenv'
dotenv.config()
const apiKey = process.env.FIREBASE_API_KEY
const authDomain = process.env.FIREBASE_AUTH_DOMAIN
const projectId = process.env.FIREBASE_PROJECT_ID
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET
const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID
const appId = process.env.FIREBASE_APP_ID
const Mongo_url = process.env.Mongo_url
export {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  Mongo_url,
}
