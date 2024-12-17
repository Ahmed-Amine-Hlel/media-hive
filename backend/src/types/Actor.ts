import {Document} from 'mongoose';

export interface IActor extends Document {
    id: string;
    fullName: string;
    dateOfBirth: Date;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}