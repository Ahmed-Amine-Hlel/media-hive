import {IMovie} from "../../types/Movie";
import {IUser} from "../../types/User";
import {CustomError} from "../../types/CustomError";
import Movie from "../../models/movie.model";
import UserMovie from "../../models/userMovie.model";
import {IUserMovie} from "../../types/UserMovie";

interface AddMovieToWatchedListPayload {
    movieId: string;
    userId: string;
    rating: number;
    review: string;
}

export const addMovieToWatchedList = async ({
                                                movieId,
                                                review,
                                                userId,
                                                rating
                                            }: AddMovieToWatchedListPayload): Promise<IUserMovie> => {
    try {
        const movie: IMovie | null = await Movie.findOne({_id: movieId});

        if (!movie) {
            return Promise.reject(new CustomError("Movie not found", 404));
        }

        const existingUserMovie = await UserMovie.findOne({movie: movieId, user: userId});
        if (existingUserMovie) {
            return Promise.reject(new CustomError("You have already added this movie to your watched list", 400));
        }

        const newUserMovie = new UserMovie({
            movie: movieId,
            user: userId,
            watched: true,
            rating: rating,
            review: review
        });

        await newUserMovie.save();

        await newUserMovie.populate({
            path: 'movie',
            populate: {
                path: 'actors',
            },
        });

        return newUserMovie;

    } catch
        (error: any) {
        console.log("Error in addMovieToWatchedList service: ", error);
        return Promise.reject(new CustomError("Unable to add movie to watched list. Please try again later.", 500));
    }
}
