import {Document} from "mongoose";
import {IMovie} from "./Movie";
import {IUser} from "./User";

export interface IUserMovie extends Document {
    id: string;
    movie: IMovie;
    user: IUser;
    watched: boolean;
    rating: number;
    review: string | null;
    createdAt: Date;
    updatedAt: Date;
}