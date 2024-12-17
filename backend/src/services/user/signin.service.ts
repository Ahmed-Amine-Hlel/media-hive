import {IUser} from "../../types/User";
import User from "../../models/user.model";
import argon from "argon2";
import {CustomError} from "../../types/CustomError";

interface SignInPayload {
    email: string;
    password: string;
}

export const loginUser = async (payload: SignInPayload): Promise<IUser> => {
    const {email, password} = payload;

    try {
        const user: IUser | null = await User.findOne({email});
        if (!user) {
            return Promise.reject(new CustomError("User not found with this email", 401));
        }

        const isPasswordValid = await argon.verify(user.password, password);
        if (!isPasswordValid) {
            return Promise.reject(new CustomError("The password is not valid", 401));
        }

        return user;

    } catch (error: any) {
        return Promise.reject(new CustomError("Unable to process the signin. Please try again later.", 500));
    }
}