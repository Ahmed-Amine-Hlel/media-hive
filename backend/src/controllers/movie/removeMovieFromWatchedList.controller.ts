import {Request, Response} from "express";
import {CustomError} from "../../types/CustomError";
import {removeMovieFromWatchedList} from "../../services/movie/removeMovieFromWatchedList.service";

export const removeMovieFromWatchedListHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const userId = req.body.loggedInUser.id;

        const userMovie = await removeMovieFromWatchedList({
            movieId: id,
            userId
        });

        res.status(200).json({
            message: "Movie removed from watched list successfully",
        });
    } catch (error: any) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({message: error.message});
        } else {
            res.status(500).json({message: "Internal server error. Please try again later."});
        }
    }
};
