import axios from "axios"
import { BLOG_URL } from "./url"
import toast from "react-hot-toast"

export const getAllArticles = async () => {
    try {

        const res = await axios.get(`${BLOG_URL}`)
        return res?.data

    } catch (error) {
        toast.error(error)
    }
}

export const deleteArticle = async (id) => {
    try {
        const res = await axios.delete(`${BLOG_URL}/${id}`)
        return res?.data
    } catch (error) {
        toast.error(error)
    }
}