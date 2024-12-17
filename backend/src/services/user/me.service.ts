import {IUser} from "../../types/User";
import {CustomError} from "../../types/CustomError";
import User from "../../models/user.model";


export const loggedUserData = async (id: string): Promise<IUser> => {
    try {
        const user: IUser | null = await User.findOne({_id: id}, {password: 0, __v: 0});

        if (!user) {
            return Promise.reject(new CustomError("User not found", 404));
        }

        return user;
    } catch (error) {
        return Promise.reject(new CustomError("Unable to get data. Please try again later.", 500));
    }
}