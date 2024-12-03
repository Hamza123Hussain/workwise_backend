import axios from 'axios'
import { getAccessToken } from './AcessToken.js'
export const createMeeting = async (req, res) => {
  const { topic, startTime, duration } = req.body

  if (!topic || !startTime || !duration) {
    return res.status(400).json({
      error: 'Missing required fields: topic, startTime, or duration.',
    })
  }

  try {
    const accessToken = await getAccessToken()

    const response = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        topic: topic,
        type: 2, // Scheduled meeting
        start_time: startTime, // Format: 'YYYY-MM-DDTHH:mm:ssZ'
        duration: duration, // Duration in minutes
        settings: {
          host_video: true,
          participant_video: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return res.status(201).json({
      message: 'Meeting created successfully',
      meeting: response.data,
    })
  } catch (error) {
    console.error(
      'Error creating meeting:',
      error.response?.data || error.message
    )

    return res.status(500).json({
      error: 'Failed to create meeting',
      details: error.response?.data || error.message,
    })
  }
}
