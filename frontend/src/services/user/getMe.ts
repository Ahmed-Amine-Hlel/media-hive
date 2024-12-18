import {User} from "@/types/User";
import axiosInstance from "@/config/axiosInstance";


export const getMe = async (): Promise<User> => {
    try {
        const response = await axiosInstance.get<User>('/me');
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}