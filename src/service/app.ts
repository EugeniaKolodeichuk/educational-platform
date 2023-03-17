import axios from 'axios';

const baseURL = 'https://api.wisey.app/api/v1';

export const getToken = async () => {
    const response = await axios.get(
        `${baseURL}/auth/anonymous?platform=subscriptions`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    }
    );
    return response.data.token;
}

const requestCoursesData = async (token: string) => {
    const response = await axios.get(`${baseURL}/core/preview-courses`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        },
    })
    return response.data
}

export const getAllCourses = async () => {
    try {
        const token = await getToken();
        const data = await requestCoursesData(token);
        return data.courses;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching courses data');
    }
}

export const requestCourseData = async (token: string, courseId: string) => {
    const response = await axios.get(`${baseURL}/core/preview-courses/${courseId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        },
    })
    console.log(response.data)
    return response.data
}

export const getCourseInfo = async (courseId: string) => {
    try {
        const token = await getToken();
        const data = await requestCourseData(token, courseId);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching course data');
    }
}