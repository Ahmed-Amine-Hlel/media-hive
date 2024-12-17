import {Request, Response} from "express";
import {CustomError} from "../../types/CustomError";
import {updateMovie} from "../../services/movie/update.service";


export const updateMovieHandler = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const movie = await updateMovie(id, req.body);

        res.status(200).json({
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