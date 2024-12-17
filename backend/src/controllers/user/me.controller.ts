import {Request, Response} from "express";
import {CustomError} from "../../types/CustomError";
import {JWTPayload} from "../../types/JWTPayload";
import {loggedUserData} from "../../services/user/me.service";


export const loggedUserDataHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const loggedInUser: JWTPayload = req.body.loggedInUser;
        const user = await loggedUserData(loggedInUser.id);
        res.status(200).json({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (error: any) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({message: error.message});
        } else {
            res.status(500).json({message: "Internal server error. Please try again later."});
        }
    }

}