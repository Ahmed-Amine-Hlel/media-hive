import {Movie} from "@/types/Movie";
import axiosInstance from "@/config/axiosInstance";


export const getMovies = async (): Promise<Movie[]> => {
    try {
        const response = await axiosInstance.get<Movie[]>('/movie');
        return response.data;

    } catch (error) {
        return Promise.reject(error);
    }
}