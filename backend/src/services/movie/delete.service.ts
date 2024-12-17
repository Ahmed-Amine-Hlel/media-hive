import {CustomError} from "../../types/CustomError";
import {IMovie} from "../../types/Movie";
import Movie from "../../models/movie.model";

export const deleteMovie = async (id: string): Promise<void> => {
    try {

        const movie: IMovie | null = await Movie.findOne({_id: id});

        if (!movie) {
            return Promise.reject(new CustomError("Movie not found", 404));
        }

        await movie.deleteOne({_id: id});
        
    } catch (error: any) {
        return Promise.reject(new CustomError("Unable to delete movie. Please try again later.", 500));
    }
}