import {IMovie} from "../../types/Movie";
import {CustomError} from "../../types/CustomError";
import Movie from "../../models/movie.model";


export const getMovieById = async (id: string): Promise<IMovie> => {

    try {

        const movie: IMovie | null = await Movie.findOne({_id: id}).populate("actors");
        if (!movie) {
            return Promise.reject(new CustomError("Movie not found.", 404));
        }

        return movie;

    } catch (error) {
        return Promise.reject(new CustomError("Unable to fetch movie. Please try again later.", 500));
    }
}