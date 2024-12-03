import axios from 'axios'
import { Zoom_Acc_ID, ZOOM_C_ID, ZOOM_secret } from '../../../Config.js'

export const getAccessToken = async () => {
  const ZOOM_AccountID = Zoom_Acc_ID
  const ZOOM_ClientID = ZOOM_C_ID
  const ZOOM_ClientSecret = ZOOM_secret

  const auth = Buffer.from(`${ZOOM_ClientID}:${ZOOM_ClientSecret}`).toString(
    'base64'
  ) // Encode credentials

  try {
    const response = await axios.post('https://zoom.us/oauth/token', null, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      params: {
        grant_type: 'account_credentials',
        account_id: ZOOM_AccountID, // Pass account ID
      },
    })
    console.log('Access Token:', response.data.access_token)
    return response.data.access_token
  } catch (error) {
    console.error(
      'Error fetching access token:',
      error.response?.data || error.message
    )
    throw error
  }
}
