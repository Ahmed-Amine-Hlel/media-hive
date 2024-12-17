import {IMovie} from "../../types/Movie";
import {CustomError} from "../../types/CustomError";
import Movie from "../../models/movie.model";


interface SaveMoviePayload {
    title: string;
    description: string;
    coverImage: string;
    duration: string;
    language: string;
    rating: number;
}

export const saveMovie = async (movie: SaveMoviePayload): Promise<IMovie> => {

    const {title, description, coverImage, duration, language, rating} = movie;
    try {

        const newMovie: IMovie = new Movie({
            title,
            description,
            coverImage,
            duration,
            language,
            rating,
        });

        return await newMovie.save();

    } catch (error) {
        return Promise.reject(new CustomError("Unable to save movie. Please try again later.", 500));
    }
}