import {Request, Response} from "express";
import {CustomError} from "../../types/CustomError";
import {deleteGenre} from "../../services/genre/delete.service";

export const deleteGenreHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        await deleteGenre(id);

        res.status(200).json({message: "Genre deleted successfully."});

    } catch (error: any) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({message: error.message});
        } else {
            res.status(500).json({message: "Internal server error. Please try again later."});
        }
    }
};
