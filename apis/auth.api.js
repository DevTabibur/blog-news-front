import axios from 'axios'
import { AUTH_URL } from './url'

export const loggedInUser = async token => {

  try {
    const config = {
      headers: {
        authorization: `${token}`,
      },
    }
    const res = await axios.get(`${AUTH_URL}/me`, config)
    // console.log('res', res);
    return res?.data
  } catch (error) {
    console.log('loggedInUser function error', error)
  }
}
