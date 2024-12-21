import axiosInstance from "@/config/axiosInstance";
import {Movie} from "@/types/Movie";


interface RemoveGenreFromMovieData {
    genreId: string;
}

interface RemoveGenreFromMovieResponse {
    message: string;
    movie: Movie;
}

export const removeGenreFromMovie = async (movieId: string, payload: RemoveGenreFromMovieData): Promise<RemoveGenreFromMovieResponse> => {
    try {
        const response = await axiosInstance.put<RemoveGenreFromMovieResponse>(`/movie/${movieId}/remove-genre`, {
            genreId: payload.genreId
        })
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}