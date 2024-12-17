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

        movie.actors.push(actor);

        await movie.save();

        return movie;

    } catch (error: any) {
        return Promise.reject(new CustomError("Unable to add actor to movie. Please try again later.", 500));
    }

}