import {Request, Response} from 'express';
import {CustomError} from "../../types/CustomError";
import {deleteMovie} from "../../services/movie/delete.service";

export const deleteMovieHandler = async (req: Request, res: Response) => {

    try {

        const {id} = req.params;
        await deleteMovie(id);

        res.status(200).json({message: "Movie deleted successfully."});

    } catch (error: any) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({message: error.message});
        } else {
            res.status(500).json({message: "Internal server error. Please try again later."});
        }
    }

}