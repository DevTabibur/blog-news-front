import axios from "axios"
import { SERVICE_URL } from "./url"

export const getAllServices = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    }
    try {
        const res = await axios.get(`${SERVICE_URL}`, config)
        return res?.data
    } catch (error) {
        console.log('getAllServices error', error)
    }
}