import {Request, Response} from 'express';
import {CustomError} from "../../types/CustomError";
import {addMovieToWatchedList} from "../../services/movie/addMovieToWatchedList.service";

export const addMovieToWatchedListHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const {rating, review} = req.body;
        const userId = req.body.loggedInUser.id;

        const userMovie = await addMovieToWatchedList({
            movieId: id,
            userId,
            rating,
            review
        });

        res.status(201).json({
            message: "Movie added to watched list successfully",
            userMovie: {
                id: userMovie.id,
                movie: {
                    id: userMovie.movie.id,
                    title: userMovie.movie.title,
                    description: userMovie.movie.description,
                    coverImage: userMovie.movie.coverImage,
                    duration: userMovie.movie.duration,
                    language: userMovie.movie.language,
                    rating: userMovie.movie.rating,
                    actors: userMovie.movie.actors.map(actor => {
                        return {
                            id: actor._id,
                            fullName: actor.fullName,
                            dateOfBirth: actor.dateOfBirth,
                            createdAt: actor.createdAt,
                            updatedAt: actor.updatedAt
                        }
                    }),
                    createdAt: userMovie.movie.createdAt,
                    updatedAt: userMovie.movie.updatedAt
                },
                watched: userMovie.watched,
                rating: userMovie.rating,
                review: userMovie.review,
                createdAt: userMovie.createdAt,
                updatedAt: userMovie.updatedAt
            }
        });
    } catch (error: any) {
        console.log("ERROR  => ", error);

        if (error instanceof CustomError) {
            res.status(error.statusCode).json({message: error.message});
        } else {
            res.status(500).json({message: "Internal server error. Please try again later."});
        }
    }
};
