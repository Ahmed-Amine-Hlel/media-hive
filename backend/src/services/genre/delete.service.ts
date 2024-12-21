import {CustomError} from "../../types/CustomError";
import {IGenre} from "../../types/IGenre";
import Genre from "../../models/genre.model";

export const deleteGenre = async (id: string): Promise<void> => {
    try {
        const genre: IGenre | null = await Genre.findOne({_id: id});

        if (!genre) {
            return Promise.reject(new CustomError("Genre not found", 404));
        }

        await genre.deleteOne({_id: id});
    } catch (error: any) {
        return Promise.reject(new CustomError("Unable to delete genre. Please try again later.", 500));
    }
};
