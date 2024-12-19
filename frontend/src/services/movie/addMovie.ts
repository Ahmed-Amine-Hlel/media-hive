import {Movie} from "@/types/Movie";
import axiosInstance from "@/config/axiosInstance";

interface AddMovieData {
    title: string;
    description: string;
    coverImage: string;
    duration: string;
    language: string;
    rating: number
}


export const addMovie = async (data: AddMovieData): Promise<Movie> => {
    try {

        const response = await axiosInstance.post<Movie>("/movie", {
            ...data
        });

        return response.data;

    } catch (error) {
        return Promise.reject(error);
    }
}