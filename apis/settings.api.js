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


export const uploadLogo = async (formData) => {
    try {
        // Replace 'your-upload-endpoint' with the actual URL where you want to upload the logo
        const response = await axios.post(`${SETTINGS_URL}/upload-logo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the content type for file upload
            },
        });

        console.log('uploadLogo response', response.data);
        return response.data;
    } catch (error) {
        toast.error(error)
    }
};


export const currentLogo = async() =>{
    try {
        const res = await axios.get(`${SETTINGS_URL}/get-logo`)
        // console.log('res', res.data);
        return res?.data
    } catch (error) {
        
    }
}