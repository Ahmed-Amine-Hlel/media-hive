import axiosInstance from "@/config/axiosInstance";
import {Movie} from "@/types/Movie";


interface AddActorToMovieData {
    actorId: string;
}

interface AddActorToMovieResponse {
    message: string;
    movie: Movie;
}

export const addActorToMovie = async (movieId: string, payload: AddActorToMovieData): Promise<AddActorToMovieResponse> => {
    try {
        const response = await axiosInstance.put<AddActorToMovieResponse>(`/movie/${movieId}/add-actor`, {
            actorId: payload.actorId
        })
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}