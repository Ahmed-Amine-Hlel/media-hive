import {Request, Response, NextFunction} from "express";
import {JWTPayload} from "../types/JWTPayload";
import jwt from "jsonwebtoken";

export const protectUserRoutes = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    let token: string | null = null;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {

        try {
            token = req.headers.authorization.split(" ")[1];
            const decodedToken: JWTPayload = jwt.verify(
                token,
                process.env.JWT_SECRET as string
            ) as JWTPayload;


            req.body.loggedInUser = decodedToken;

            next();
        } catch (error) {
            return res.status(401).json({
                message: "The token is invalid or has expired",
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            message: "You are not authorized to access this route",
        });
    }
};
