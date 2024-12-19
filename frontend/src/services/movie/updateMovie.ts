import {Movie} from "@/types/Movie";
import axiosInstance from "@/config/axiosInstance";


interface EditMovieData {
    title: string;
    description: string;
    coverImage: string;
    duration: string;
    language: string;
    rating: number
}

export const updateMovie = async (id: string, data: EditMovieData): Promise<Movie> => {
    try {
        const response = await axiosInstance.put<Movie>(`/movie/${id}`, {
            ...data
        });

        return response.data;

    } catch (error) {
        return Promise.reject(error);
    }
}