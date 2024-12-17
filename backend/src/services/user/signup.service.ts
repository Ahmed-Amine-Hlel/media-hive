import {IUser} from "../../types/User";
import User from "../../models/user.model";
import argon from "argon2";
import {CustomError} from "../../types/CustomError";

interface SignupPayload {
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    password: string;
}

export const registerUser = async (payload: SignupPayload): Promise<IUser> => {
    const {firstName, lastName, gender, email, password} = payload;

    try {

        const isUserExist = await User.findOne({email});
        if (isUserExist) {
            return Promise.reject(new CustomError("User already exists with this email", 409));
        }

        const hashedPassword = await argon.hash(password);
        const newUser: IUser = new User({
            firstName,
            lastName,
            gender,
            email,
            password: hashedPassword,
        });

        return await newUser.save();
    } catch (error) {
        return Promise.reject(new CustomError("Unable to process the signup. Please try again later.", 500));
    }
};
