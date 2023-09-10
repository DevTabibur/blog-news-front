import axios from "axios"
import { TEAM_URL } from "./url"

export const getAllTeamMembers = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    }
    try {

        const res = await axios.get(`${TEAM_URL}`, config)
        return res?.data

    } catch (error) {
        console.log('getAllTeamMembers api error', error);
    }
}