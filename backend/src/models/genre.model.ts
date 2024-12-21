import {Schema, model} from "mongoose";
import {IGenre} from "../types/IGenre";

const genreSchema = new Schema<IGenre>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {timestamps: true}
);

const Genre = model<IGenre>("Genre", genreSchema);
export default Genre;
