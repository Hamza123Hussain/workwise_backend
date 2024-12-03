import { Router } from 'express'
import { getAccessToken } from '../Controller/Meeting/AcessToken.js'
import axios from 'axios'
export const getUserMeetings = async () => {
  const accessToken = await getAccessToken()
  try {
    const response = await axios.get(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    return response.data.meetings // Array of meetings
  } catch (error) {
    console.error(
      'Error fetching user meetings:',
      error.response.data || error.message
    )
    throw error
  }
}

export const MeetingRouter = Router()
MeetingRouter.post('/AcessToken', getUserMeetings)
