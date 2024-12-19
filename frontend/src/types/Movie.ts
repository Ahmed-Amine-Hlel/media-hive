import {Actor} from "@/types/Actor";


export interface Movie {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    duration: string;
    language: string;
    rating: number;
    actors: Actor[];
    createdAt: Date;
    updatedAt: Date;
}