import {Request, Response} from "express";
import {CustomError} from "../../types/CustomError";
import {getWatchedMoviesList} from "../../services/watchedList/get.service";

export const getWatchedMoviesListHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.body.loggedInUser.id;


        const userMovies = await getWatchedMoviesList({
            userId
        });

        res.status(200).json({
            userMovies: userMovies.map((userMovie) => ({
                id: userMovie.id,
                movie: {
                    id: userMovie.movie.id,
                    title: userMovie.movie.title,
                    description: userMovie.movie.description,
                    coverImage: userMovie.movie.coverImage,
                    duration: userMovie.movie.duration,
                    language: userMovie.movie.language,
                    rating: userMovie.movie.rating,
                    actors: userMovie.movie.actors.map((actor) => ({
                        id: actor._id,
                        fullName: actor.fullName,
                        dateOfBirth: actor.dateOfBirth,
                        createdAt: actor.createdAt,
                        updatedAt: actor.updatedAt,
                    })),
                    createdAt: userMovie.movie.createdAt,
                    updatedAt: userMovie.movie.updatedAt,
                },
                watched: userMovie.watched,
                rating: userMovie.rating,
                review: userMovie.review,
                createdAt: userMovie.createdAt,
                updatedAt: userMovie.updatedAt,
            })),
        });
    } catch (error: any) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({message: error.message});
        } else {
            res.status(500).json({message: "Internal server error. Please try again later."});
        }
    }
};
