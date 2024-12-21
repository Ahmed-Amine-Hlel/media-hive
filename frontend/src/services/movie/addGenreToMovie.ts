import axiosInstance from "@/config/axiosInstance";
import {Movie} from "@/types/Movie";


interface AddGenreToMovieData {
    genreId: string;
}

interface AddGenreToMovieResponse {
    message: string;
    movie: Movie;
}

export const addGenreToMovie = async (movieId: string, payload: AddGenreToMovieData): Promise<AddGenreToMovieResponse> => {
    try {
        const response = await axiosInstance.put<AddGenreToMovieResponse>(`/movie/${movieId}/add-genre`, {
            genreId: payload.genreId
        })
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}