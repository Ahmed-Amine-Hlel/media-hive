import {IGenre} from "../../types/IGenre";
import Genre from "../../models/genre.model";
import {CustomError} from "../../types/CustomError";


interface UpdateGenrePayload {
    name: string;
    description: string;
}

export const updateGenre = async (id: string, payload: UpdateGenrePayload): Promise<IGenre> => {
    const {name, description} = payload;

    try {
        const genre: IGenre | null = await Genre.findOne({_id: id});
        if (!genre) {
            return Promise.reject(new CustomError("Genre not found", 404));
        }

        genre.name = name;
        genre.description = description;

        return await genre.save();
    } catch (error: any) {
        return Promise.reject(new CustomError("Unable to update genre. Please try again later.", 500));
    }
};
