import {body, validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";

export const signinValidationRules = [
    body("email")
        .isEmail().withMessage("Invalid email address"),
    body("password")
        .isLength({min: 8}).withMessage("Password must be at least 8 characters long")
        .matches(/\d/).withMessage("Password must contain at least one digit")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
];


export const validateSigninRequest = (req: Request, res: Response, next: NextFunction): any => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failed",
            errors: errors.array(),
        });
    }

    next();
}