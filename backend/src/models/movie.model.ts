import {IMovie} from "../types/Movie";
import {Schema, model} from "mongoose";
import {languages} from "../utils/Languages";

const movieSchema = new Schema<IMovie>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        coverImage: {
            type: String,
            required: true,
            validate: {
                validator: (value: string) => {
                    return /^(http|https):\/\/[^\s]+$/i.test(value);
                },
                message: "Invalid URL for coverImage",
            },
        },
        duration: {
            type: String,
            required: true,
            validate: {
                validator: (value: string) => {
                    return /^\d{1,2}:\d{2}$/.test(value);
                },
                message: "Invalid duration format (expected hh:mm)",
            },
        },
        language: {
            type: String,
            required: true,
            enum: languages,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },
        actors: [
            {
                type: Schema.Types.ObjectId,
                ref: "Actor",
            },
        ],
        genres: [
            {
                type: Schema.Types.ObjectId,
                ref: "Genre",
            },
        ],
    },
    {timestamps: true}
);

const Movie = model<IMovie>("Movie", movieSchema);
export default Movie;
