import {Request, Response} from "express";
import {CustomError} from "../../types/CustomError";
import {updateGenre} from "../../services/genre/update.service";

export const updateGenreHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;

        const genre = await updateGenre(id, req.body);

        res.status(200).json({
            id: genre.id,
            name: genre.name,
            description: genre.description,
            createdAt: genre.createdAt,
            updatedAt: genre.updatedAt,
        });

    } catch (error: any) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({message: error.message});
        } else {
            res.status(500).json({message: "Internal server error. Please try again later."});
        }
    }
};
