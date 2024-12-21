import {Genre} from "@/types/Genre";
import axiosInstance from "@/config/axiosInstance";


export const getGenres = async (): Promise<Genre[]> => {
    try {
        const response = await axiosInstance.get<Genre[]>('/genre');
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}