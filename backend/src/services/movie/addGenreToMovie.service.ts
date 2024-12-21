import {IMovie} from "../../types/Movie";
import {CustomError} from "../../types/CustomError";
import Movie from "../../models/movie.model";
import Genre from "../../models/genre.model";
import {IGenre} from "../../types/IGenre"; // Assuming you have a Genre model

export const addGenreToMovie = async (movieId: string, genreId: string): Promise<IMovie> => {
    try {

        const movie: IMovie | null = await Movie.findOne({_id: movieId});
        const genre: IGenre | null = await Genre.findOne({_id: genreId});

        if (!movie) {
            return Promise.reject(new CustomError("Movie not found", 404));
        }

        if (!genre) {
            return Promise.reject(new CustomError("Genre not found", 404));
        }

        if (movie.genres.some((g) => g.toString() === genreId)) {
            return Promise.reject(new CustomError("Genre already added to the movie.", 400));
        }

        movie.genres.push(genre);

        await movie.save();

        const populatedMovie = await Movie.findOne({_id: movieId})
            .populate('actors')
            .populate('genres');

        if (!populatedMovie) {
            return Promise.reject(new CustomError("Error retrieving movie after update.", 500));
        }

        return populatedMovie;

    } catch (error: any) {
        return Promise.reject(new CustomError("Unable to add genre to movie. Please try again later.", 500));
    }
}
