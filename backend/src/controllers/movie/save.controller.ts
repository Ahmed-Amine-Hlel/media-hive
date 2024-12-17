import {Request, Response} from 'express';
import {CustomError} from "../../types/CustomError";
import {saveMovie} from "../../services/movie/save.service";


export const saveMovieHandler = async (req: Request, res: Response): Promise<void> => {
    try {

        const payload = req.body;
        const movie = await saveMovie(payload);

        res.status(201).json({
            id: movie.id,
            title: movie.title,
            description: movie.description,
            coverImage: movie.coverImage,
            duration: movie.duration,
            language: movie.language,
            rating: movie.rating,
            createdAt: movie.createdAt,
            updatedAt: movie.updatedAt
        });

    } catch (error: any) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({message: error.message});
        } else {
            res.status(500).json({message: "Internal server error. Please try again later."});
        }
    }
}