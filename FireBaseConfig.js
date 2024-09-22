import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyC-ud1vUtc-c_Fah6wWeJhK06hEma-BjbI',
  authDomain: 'workwise-86c48.firebaseapp.com',
  projectId: 'workwise-86c48',
  storageBucket: 'workwise-86c48.appspot.com',
  messagingSenderId: '139878436868',
  appId: '1:139878436868:web:8451c8e53390fb77f22551',
}
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const Storage = getStorage(app)
