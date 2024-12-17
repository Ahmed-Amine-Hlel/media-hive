import {CustomError} from "../../types/CustomError";
import UserMovie from "../../models/userMovie.model";
import {IUserMovie} from "../../types/UserMovie";

interface RemoveMovieFromWatchedListPayload {
    movieId: string;
    userId: string;
}

export const removeMovieFromWatchedList = async ({
                                                     movieId,
                                                     userId
                                                 }: RemoveMovieFromWatchedListPayload): Promise<void> => {
    try {
        const userMovie = await UserMovie.findOne({movie: movieId, user: userId});

        if (!userMovie) {
            return Promise.reject(new CustomError("Movie not found in the watched list", 404));
        }

        await userMovie.deleteOne();

    } catch (error: any) {
        console.log("Error in removeMovieFromWatchedList service: ", error);
        return Promise.reject(new CustomError("Unable to remove movie from watched list. Please try again later.", 500));
    }
};
