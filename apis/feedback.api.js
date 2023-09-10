import axios from 'axios'
import { FEEDBACK_URL } from './url'

// export const getALlUsers = async () => {
//     try {
//         const response = await axios.get(`${BASE_URL}/users`)
//         return response?.data
//     } catch (error) {
//         console.log(error)
//     }
// }


export const postFeedback = async feedbackData => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    }
    try {
        const res = await axios.post(`${FEEDBACK_URL}`, config)
        console.log('res', res);
        return res?.data
    } catch (error) {
        console.log(error)
    }
}



export const getAllFeedback = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    }
    try {
        const res = await axios.get(`${FEEDBACK_URL}`, config)
        return res?.data
    } catch (error) {
        console.log('getAllFeedback error', error)
    }
}
