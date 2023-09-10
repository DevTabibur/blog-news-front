import axios from 'axios'
import { FAQ_URL } from './url'


export const getAllFAQ = async () => {
    const config = {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }
    try {
        const res = await axios.get(`${FAQ_URL}`, config)
        return res?.data

    } catch (error) {
        console.log('getAllFAQ function error', error);
    }
}


export const deleteSingleFAQ = async (faqId) => {

    try {
        const config = {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        const res = await axios.delete(`${FAQ_URL}/${faqId}`, config)
        return res?.data

    } catch (error) {
        console.log('deleteSingleFAQ function error', error);

    }
}