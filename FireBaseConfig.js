import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database' // Import Realtime Database
import {
  apiKey,
  appId,
  authDomain,
  messagingSenderId,
  projectId,
  storageBucket,
} from './Config.js'

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Export Firebase services
export const auth = getAuth(app)
export const Storage = getStorage(app)
export const database = getDatabase(app) // Export Realtime Database
