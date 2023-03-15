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
    let courses;
    await getToken()
        .then(token => requestCoursesData(token).then(data => {
            courses = data.courses
        }))
    return courses
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
    let courseData;
    await getToken()
        .then(token => requestCourseData(token, courseId).then(data => {
            courseData = data
        }))
    return courseData
} 