import {CustomError} from "../../types/CustomError";
import {IGenre} from "../../types/IGenre";
import Genre from "../../models/genre.model";


export const getGenres = async (): Promise<IGenre[]> => {
    try {
        const genres: IGenre[] = await Genre.find()
        return genres;
    } catch (error: any) {
        return Promise.reject(new CustomError("Unable to fetch genres. Please try again later.", 500));
    }
}