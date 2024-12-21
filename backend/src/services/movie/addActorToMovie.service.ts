import {IMovie} from "../../types/Movie";
import {CustomError} from "../../types/CustomError";
import Movie from "../../models/movie.model";
import {IActor} from "../../types/Actor";
import Actor from "../../models/actor.model";


export const addActorToMovie = async (movieId: string, actorId: string): Promise<IMovie> => {
    try {

        const movie: IMovie | null = await Movie.findOne({_id: movieId});
        const actor: IActor | null = await Actor.findOne({_id: actorId});

        if (!movie) {
            return Promise.reject(new CustomError("Movie not found", 404));
        }

        if (!actor) {
            return Promise.reject(new CustomError("Actor not found", 404));
        }

        if (movie.actors.some((a) => a.toString() === actorId)) {
            return Promise.reject(new CustomError("Actor already exists in the movie.", 400));
        }

        movie.actors.push(actor);

        await movie.save();

        // Populate the actors field to return full actor details.
        const populatedMovie = await Movie.findOne({ _id: movieId }).populate('actors');

        if (!populatedMovie) {
            return Promise.reject(new CustomError("Error retrieving movie after update.", 500));
        }

        return populatedMovie;


    } catch (error: any) {
        return Promise.reject(new CustomError("Unable to add actor to movie. Please try again later.", 500));
    }

}