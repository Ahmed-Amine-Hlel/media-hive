import {body, validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";

export const signupValidationRules = [
    body("firstName")
        .notEmpty().withMessage("First name is required")
        .isLength({min: 2}).withMessage("First name must be at least 2 characters long"),
    body("lastName")
        .notEmpty().withMessage("Last name is required")
        .isLength({min: 2}).withMessage("Last name must be at least 2 characters long"),
    body("email")
        .isEmail().withMessage("Invalid email address"),
    body("password")
        .isLength({min: 8}).withMessage("Password must be at least 8 characters long")
        .matches(/\d/).withMessage("Password must contain at least one digit")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter"),
    body("phone")
        .optional()
        .isMobilePhone("any").withMessage("Invalid phone number"),
    body("gender")
        .isIn(["male", "female"]).withMessage("Invalid gender value, must be either male of female"),
];


export const validateSignupRequest = (req: Request, res: Response, next: NextFunction): any => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failed",
            errors: errors.array(),
        });
    }

    next();
}