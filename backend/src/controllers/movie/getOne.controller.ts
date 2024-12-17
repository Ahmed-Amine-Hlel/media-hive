import {Request, Response} from 'express';
import {CustomError} from "../../types/CustomError";
import {getMovieById} from "../../services/movie/getOne.service";

export const getMovieByIdHandler = async (req: Request, res: Response): Promise<void> => {

    try {
        const {id} = req.params;
        const movie = await getMovieById(id);
        res.status(200).json({
            id: movie.id,
            title: movie.title,
            description: movie.description,
            coverImage: movie.coverImage,
            duration: movie.duration,
            language: movie.language,
            rating: movie.rating,
            actors: movie.actors.map(actor => {
                return {
                    id: actor._id,
                    fullName: actor.fullName,
                    dateOfBirth: actor.dateOfBirth,
                    createdAt: actor.createdAt,
                    updatedAt: actor.updatedAt
                }
            }),
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
};