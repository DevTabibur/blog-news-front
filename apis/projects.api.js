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