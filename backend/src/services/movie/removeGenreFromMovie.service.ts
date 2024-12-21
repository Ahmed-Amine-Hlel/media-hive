import {IMovie} from "../../types/Movie";
import {CustomError} from "../../types/CustomError";
import Movie from "../../models/movie.model";
import Genre from "../../models/genre.model"; // Assuming you have a Genre model
import {Types} from "mongoose";
import {IGenre} from "../../types/IGenre";

export const removeGenreFromMovie = async (movieId: string, genreId: string): Promise<IMovie> => {
    try {
        const movie: IMovie | null = await Movie.findOne({_id: movieId});
        const genre: IGenre | null = await Genre.findOne({_id: genreId});

        if (!movie) {
            return Promise.reject(new CustomError("Movie not found", 404));
        }

        if (!genre) {
            return Promise.reject(new CustomError("Genre not found", 404));
        }

        if (!movie.genres.some((g) => (g._id as Types.ObjectId).toString() === genreId)) {
            return Promise.reject(new CustomError("Genre does not exist in the movie.", 400));
        }

        // Remove the genre from the movie's genres array
        movie.genres = movie.genres.filter((g: IGenre) => {
            return (g._id as Types.ObjectId).toString() !== (genre._id as Types.ObjectId).toString();
        });

        await movie.save();

        // Populate the genres and actors fields to return full details.
        const populatedMovie = await Movie.findOne({_id: movieId})
            .populate('actors')
            .populate('genres');

        if (!populatedMovie) {
            return Promise.reject(new CustomError("Error retrieving movie after update.", 500));
        }

        return populatedMovie;

    } catch (error: any) {
        return Promise.reject(new CustomError("Unable to remove genre from movie. Please try again later.", 500));
    }
}
