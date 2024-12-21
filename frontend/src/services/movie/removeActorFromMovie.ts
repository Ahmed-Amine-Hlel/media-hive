import {Movie} from "@/types/Movie";
import axiosInstance from "@/config/axiosInstance";


interface RemoveActorFromMovieData {
    actorId: string;
}

interface RemoveActorFromMovieResponse {
    message: string;
    movie: Movie;
}


export const removeActorFromMovie = async (movieId: string, payload: RemoveActorFromMovieData): Promise<RemoveActorFromMovieResponse> => {
    try {
        const response = await axiosInstance.put<RemoveActorFromMovieResponse>(`/movie/${movieId}/remove-actor`, {
            actorId: payload.actorId
        })
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
