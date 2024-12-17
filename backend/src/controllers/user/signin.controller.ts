import {Request, Response} from "express";
import {IUser} from "../../types/User";
import jwt from "jsonwebtoken";
import {CustomError} from "../../types/CustomError";
import {loginUser} from "../../services/user/signin.service";


export const signinHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const payload = req.body;
        const user: IUser = await loginUser(payload);

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET as string,
            {expiresIn: "30d"}
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                gender: user.gender,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    } catch (error: any) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({message: error.message});
        } else {
            res.status(500).json({message: "Internal server error. Please try again later."});
        }
    }
}