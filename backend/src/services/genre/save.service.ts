import {IGenre} from "../../types/IGenre";
import {CustomError} from "../../types/CustomError";
import Genre from "../../models/genre.model";


interface SaveGenrePayload {
    name: string;
    description: string;
}

export const saveGenre = async (payload: SaveGenrePayload): Promise<IGenre> => {

    const {name, description} = payload;
    try {

        const newGenre: IGenre = new Genre({
            name,
            description,
        });

        return await newGenre.save();

    } catch (error) {
        console.log("Error occurred while saving genre: ", error);
        return Promise.reject(new CustomError("Unable to save genre. Please try again later.", 500));
    }
}