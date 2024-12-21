import {Request, Response} from 'express';
import {CustomError} from "../../types/CustomError";
import {saveGenre} from "../../services/genre/save.service";

export const saveGenreHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const payload = req.body;
        
        const genre = await saveGenre(payload);

        res.status(201).json({
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
