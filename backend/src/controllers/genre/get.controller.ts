import {Request, Response} from 'express';
import {getGenres} from "../../services/genre/get.service";
import {CustomError} from "../../types/CustomError";

export const getGenresHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const genres = await getGenres();

        const mappedGenres = genres.map(genre => {
            return {
                id: genre.id,
                name: genre.name,
                description: genre.description,
                createdAt: genre.createdAt,
                updatedAt: genre.updatedAt,
            };
        });

        res.status(200).json(mappedGenres);
    } catch (error: any) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({message: error.message});
        } else {
            res.status(500).json({message: "Internal server error. Please try again later."});
        }
    }
};
