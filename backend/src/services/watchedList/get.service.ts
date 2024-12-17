import {CustomError} from "../../types/CustomError";
import UserMovie from "../../models/userMovie.model";
import {IUserMovie} from "../../types/UserMovie";

interface GetWatchedMoviesListPayload {
    userId: string;
}

export const getWatchedMoviesList = async ({userId}: GetWatchedMoviesListPayload): Promise<IUserMovie[]> => {
    try {
        const userMovies = await UserMovie.find({user: userId})
            .populate({
                path: 'movie',
                populate: {
                    path: 'actors',
                },
            })
            .exec();

        return userMovies;
    } catch (error: any) {
        console.log("Error in getWatchedMoviesList service: ", error);
        return Promise.reject(new CustomError("Unable to fetch watched movies. Please try again later.", 500));
    }
};