import {IMovie} from "../../types/Movie";
import {CustomError} from "../../types/CustomError";
import Movie from "../../models/movie.model";


export const getMovies = async (): Promise<IMovie[]> => {
    try {
        const movies: IMovie[] = await Movie.find()
            .populate("actors")
            .populate("genres");
        return movies;
    } catch (error: any) {
        return Promise.reject(new CustomError("Unable to fetch movies. Please try again later.", 500));
    }
}