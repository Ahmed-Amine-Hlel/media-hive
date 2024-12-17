import {IMovie} from "../../types/Movie";
import {CustomError} from "../../types/CustomError";
import Movie from "../../models/movie.model";

interface UpdateMoviePayload {
    title: string;
    description: string;
    coverImage: string;
    duration: string;
    language: string;
    rating: number;
}


export const updateMovie = async (id: string, payload: UpdateMoviePayload): Promise<IMovie> => {

    const {title, description, coverImage, duration, language, rating} = payload;

    try {

        const movie: IMovie | null = await Movie.findOne({_id: id});
        if (!movie) {
            return Promise.reject(new CustomError("Movie not found", 404));
        }

        movie.title = title;
        movie.description = description;
        movie.coverImage = coverImage;
        movie.duration = duration;
        movie.language = language;
        movie.rating = rating;

        return await movie.save();

    } catch (error: any) {
        return Promise.reject(new CustomError("Unable to update movie. Please try again later.", 500));
    }
}