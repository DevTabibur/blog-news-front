import toast from "react-hot-toast";
import { CATEGORY_URL } from "./url";
import axios from "axios";

export const getAllCategory = async () => {
    // const config = {
    //     headers: {
    //         'content-type': 'application/json',
    //         authorization: `Bearer ${localStorage.getItem('accessToken')}`
    //     }
    // }
    try {
        const res = await axios.get(`${CATEGORY_URL}`)
        return res?.data

    } catch (error) {
        toast.error('getAllCategory function error', error?.response?.data?.message);
    }
}


export const deleteACategory = async (categoryID) => {
    try {
        const result = await axios.delete(`${CATEGORY_URL}/${categoryID}`)
        return result?.data
    } catch (error) {
        console.log('deleteACategory function error', error);
    }
}


export const updateCategory = async (categoryId, categoryData) => {

    try {
        const result = await axios.patch(`${CATEGORY_URL}/${categoryId}`, categoryData)
        return result?.data
    } catch (error) {
        console.log('updateCategory function error', error);
    }
}