import axiosInstance from "@/config/axiosInstance";
import {LoginResponse} from "@/types/LoginResponse";


export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    try {

        const response = await axiosInstance.post<LoginResponse>('/signin', {
            email,
            password
        });

        return response.data;

    } catch (error) {
        return Promise.reject(error);
    }
}