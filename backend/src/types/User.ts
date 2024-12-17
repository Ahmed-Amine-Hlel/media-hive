import {Document} from "mongoose"
import {Gender} from "./Gender";
import {Role} from "./Role";

export interface IUser extends Document {
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