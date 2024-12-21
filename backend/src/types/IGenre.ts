import {Document} from 'mongoose';

export interface IGenre extends Document {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}