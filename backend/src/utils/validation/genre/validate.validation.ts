import {validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";

export const validateRequest = (req: Request, res: Response, next: NextFunction): any => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failed",
            errors: errors.array(),
        });
    }
    next();
};