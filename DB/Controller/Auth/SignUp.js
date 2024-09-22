import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import User from '../../Models/User.js'
import { auth, Storage } from '../../../FireBaseConfig.js'

export const RegisterUser = async (req, res) => {
  const { Name, Email, password } = req.body
  const image = req.file // The uploaded image file

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ Email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      Email,
      password
    )

    if (userCredential.user.uid) {
      let ImageUrl = ''

      // Upload image to Firebase Storage (if provided)
      if (image) {
        const storageRef = ref(Storage, `images/${image.originalname}`)
        await uploadBytes(storageRef, image.buffer)
        ImageUrl = await getDownloadURL(storageRef)
      }

      // Prepare user data to be stored in MongoDB
      const userData = new User({
        _id: userCredential.user.uid,
        Name,
        Email,
        imageUrl: ImageUrl
          ? ImageUrl
          : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png', // Store the image URL if uploaded
      })

      // Save user data to MongoDB
      await userData.save()

      return res
        .status(201)
        .json({ message: 'User registered successfully', user: userData })
    } else {
      return res.status(400).json({ message: 'User registration failed' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
