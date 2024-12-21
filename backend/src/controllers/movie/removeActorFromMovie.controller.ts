import {Request, Response} from 'express';
import {CustomError} from "../../types/CustomError";
import {removeActorFromMovie} from "../../services/movie/removeActorFromMovie.service";

export const removeActorFromMovieHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const {actorId} = req.body;

        const movie = await removeActorFromMovie(id, actorId);

        res.status(200).json({
            message: "Actor removed from movie successfully",
            movie: {
                id: movie.id,
                title: movie.title,
                description: movie.description,
                coverImage: movie.coverImage,
                duration: movie.duration,
                language: movie.language,
                rating: movie.rating,
                actors: movie.actors.map((actor) => {
                    return {
                        id: actor._id,
                        fullName: actor.fullName,
                        dateOfBirth: actor.dateOfBirth,
                        image: actor.image,
                        createdAt: actor.createdAt,
                        updatedAt: actor.updatedAt
                    };
                }),
                genres: movie.genres.map(genre => {
                    return {
                        id: genre._id,
                        name: genre.name,
                        createdAt: genre.createdAt,
                        updatedAt: genre.updatedAt
                    }
                }),
                createdAt: movie.createdAt,
                updatedAt: movie.updatedAt
            }
        });

    } catch (error: any) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({message: error.message});
        } else {
            res.status(500).json({message: "Internal server error. Please try again later."});
        }
    }
}
