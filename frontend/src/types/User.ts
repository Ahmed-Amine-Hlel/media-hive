import {Gender} from "@/types/Gender";
import {Role} from "@/types/Role";


export interface User {
    id: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    role: Role;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}