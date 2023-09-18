import axios from "axios";
import toast from "react-hot-toast";
import { SETTINGS_URL } from "./url";

export const updateWebsiteName = async (postData, websiteId) => {
    try {
        const result = await axios.patch(`${SETTINGS_URL}/website-name/${websiteId}`, postData)
        return result?.data
    } catch (error) {
        toast.error(error)
    }
}


export const getWebsiteName = async () => {
    try {
        const result = await axios.get(`${SETTINGS_URL}/website-name`)
        return result?.data
    } catch (error) {
        toast.error(error)
    }
}