// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBMhx9w7jL4RFsRi8BFV35uerE7cGacxJU',
  authDomain: 'hrmsystem-93957.firebaseapp.com',
  projectId: 'hrmsystem-93957',
  storageBucket: 'hrmsystem-93957.appspot.com',
  messagingSenderId: '390369426414',
  appId: '1:390369426414:web:dfde11460e743c7cb36cff',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const Storage = getStorage(app)
