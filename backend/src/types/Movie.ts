import {Document} from 'mongoose';
import {IActor} from "./Actor";
import {IGenre} from "./IGenre";

export interface IMovie extends Document {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    duration: string;
    language: string;
    rating: number;
    actors: IActor[];
    genres: IGenre[];
    createdAt: Date;
    updatedAt: Date;
}