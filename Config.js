import dotenv from 'dotenv'
dotenv.config()
const apiKey = process.env.FIREBASE_API_KEY
const authDomain = process.env.FIREBASE_AUTH_DOMAIN
const projectId = process.env.FIREBASE_PROJECT_ID
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET
const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID
const appId = process.env.FIREBASE_APP_ID
const Mongo_url = process.env.Mongo_url
const PORT = process.env.PORT
const user = process.env.OTP_user
const password = process.env.OTP_pass
const Zoom_Acc_ID = process.env.ZOOM_AccountID
const ZOOM_C_ID = process.env.ZOOM_ClientID
const ZOOM_secret = process.env.ZOOM_ClientSecret
export {
  PORT,
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  Mongo_url,
  user,
  password,
  ZOOM_C_ID,
  Zoom_Acc_ID,
  ZOOM_secret,
}
