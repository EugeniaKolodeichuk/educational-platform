import axios, { AxiosError } from 'axios';

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
};

const requestCoursesData = async (token: string) => {
    const response = await axios.get(`${baseURL}/core/preview-courses`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        },
    });
    return response.data;
};

export const errorHandling = (error: AxiosError) => {
    if (error.response) {
        const status: number = error.response.status;
        if (status === 400) {
            console.error("Bad Request");
        } else if (status === 401) {
            console.error("Unauthorized");
        } else if (status === 404) {
            console.error("Not Found");
        } else if (status >= 500) {
            console.error("Server Error");
        } else {
            console.error("Unknown Error");
        }
    } else if (error.request) {
        console.error(error.request);
    } else {
        console.error("Error", error.message);
    }

    if (error.message.includes("CORS")) {
        console.error("CORS Error");
    }

    console.error("Error", error);
    throw Error(error.message);
};

export const getAllCourses = async () => {
    try {
        const token = await getToken();
        const data = await requestCoursesData(token);
        return data.courses;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        error && errorHandling(error);
    }
};

export const requestCourseData = async (token: string, courseId: string) => {
    const response = await axios.get(
        `${baseURL}/core/preview-courses/${courseId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*",
            },
        }
    );
    return response.data;
};

export const getCourseInfo = async (courseId: string) => {
    try {
        const token = await getToken();
        const data = await requestCourseData(token, courseId);
        return data;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        errorHandling(error);
    }
};
