import {Schema, model, Document} from 'mongoose';
import {IUserMovie} from "../types/UserMovie";


const userMovieSchema = new Schema({
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    watched: {
        type: Boolean,
        default: false,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    review: {
        type: String,
        required: false,
        default: null
    }
}, {
    timestamps: true
});

const UserMovie = model<IUserMovie>('UserMovie', userMovieSchema);

export default UserMovie;
