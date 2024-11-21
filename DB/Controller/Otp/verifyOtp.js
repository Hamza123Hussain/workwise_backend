import Otp from '../../Models/Otp.js'
import { User } from '../../Models/User.js'

export const VerifyOtp = async (req, res) => {
  const { email, otp } = req.body

  // if (!email || !otp) {
  //   return res
  //     .status(400)
  //     .json({ success: false, message: 'Email and OTP are required.' })
  // }

  try {
    // Find the OTP record in the database
    const otpRecord = await Otp.findOne({ otp })
    const UserExists = await User.findOne({ email })
    if (UserExists) {
      if (!otpRecord) {
        return res
          .status(404)
          .json({ success: false, message: 'OTP not found or expired.' })
      }

      // Check if OTP matches
      if (otpRecord.otp !== otp) {
        return res.status(400).json({ success: false, message: 'Invalid OTP.' })
      }

      // If OTP is correct, return success
      return res
        .status(200)
        .json({ success: true, message: 'OTP verified successfully.' })
    } else {
      return res.status(404).json('No User Found')
    }

    // Check if OTP record exists
  } catch (error) {
    console.error('Error verifying OTP:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Failed to verify OTP.' })
  }
}
