import {Document} from 'mongoose';
import {IActor} from "./Actor";

export interface IMovie extends Document {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    duration: string;
    language: string;
    rating: number;
    actors: IActor[];
    createdAt: Date;
    updatedAt: Date;
}