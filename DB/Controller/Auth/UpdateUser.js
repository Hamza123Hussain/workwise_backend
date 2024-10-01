import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { User } from '../../Models/User.js'
import { Storage } from '../../../FireBaseConfig.js'
export const UpdateUser = async (req, res) => {
  const { Name, Email, JobDescription } = req.body
  const Image = req.file // The uploaded Image file
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ Email })
    if (existingUser.id) {
      let ImageUrl = ''
      // Upload Image to Firebase Storage (if provided)
      if (Image) {
        const storageRef = ref(Storage, `Images/${Image.originalname}`)
        await uploadBytes(storageRef, Image.buffer)
        ImageUrl = await getDownloadURL(storageRef)
      }
      // Prepare user data to be stored in MongoDB
      const userData = User.findByIdAndUpdate(
        existingUser.id,
        {
          Name,
          JobDescription,
          imageUrl: ImageUrl
            ? ImageUrl
            : 'https://static.thenounproject.com/png/363640-200.png',
        },
        { new: true }
      )
      // Save user data to MongoDB
      await userData.save()
      return res
        .status(201)
        .json({ message: 'User Has Been Updated Successfully', user: userData })
    } else {
      return res.status(400).json({ message: 'User registration failed' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message })
  }
}
