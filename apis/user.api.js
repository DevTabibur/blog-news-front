import axios from 'axios'
import { AUTH_URL, BASE_URL } from './url'
import toast from 'react-hot-toast'

export const getAdmin = async () => {
    const admin = await axios.get(`${BASE_URL}/user/admin`)
    return admin?.data
}

export const getUserById = async userId => {
    const user = await axios.get(`${BASE_URL}/users/${userId}`)
    return user?.data
}

export const getALlUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users`)
        return response?.data
    } catch (error) {
        console.log(error)
    }
}


export const registerUser = async (registerData) => {
    try {
        const res = await axios.post(`${AUTH_URL}/register`, registerData);
        return res?.data;
    } catch (error) {
        console.error(error); // Log the error for debugging

        // Return an error object that can be safely rendered
        return { error: 'An error occurred while registering.' };
    }
};

