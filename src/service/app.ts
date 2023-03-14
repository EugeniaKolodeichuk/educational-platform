import axios from 'axios';

const baseURL = 'https://api.wisey.app/api/v1';

export const getToken = async () => {
    const response = await axios.get(
        `${baseURL}/auth/anonymous?platform=subscriptions`,
    );
    return response.data.token;
}

const fetchAllCourses = async (token: string) => {
    const response = await axios.get(`${baseURL}/core/preview-courses?limit=10&page=2`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}

export const getAllCourses = async () => {
    let courses;
    await getToken()
        .then(token => fetchAllCourses(token).then(data => {
            courses = data.courses
        }))
    return courses
}