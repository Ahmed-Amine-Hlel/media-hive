import {body} from "express-validator";
import {languages} from "../../Languages";


export const movieValidationRules = [
    body("title")
        .notEmpty()
        .withMessage("Title is required")
        .isString()
        .withMessage("Title must be a string")
        .trim(),

    body("description")
        .notEmpty()
        .withMessage("Description is required")
        .isString()
        .withMessage("Description must be a string")
        .trim(),

    body("coverImage")
        .notEmpty()
        .withMessage("Cover image URL is required")
        .isURL()
        .withMessage("Cover image must be a valid URL"),

    body("duration")
        .notEmpty()
        .withMessage("Duration is required")
        .matches(/^\d{1,2}:\d{2}$/)
        .withMessage("Duration must be in hh:mm format"),

    body("language")
        .notEmpty()
        .withMessage("Language is required")
        .isString()
        .withMessage("Language must be a string")
        .isIn(languages)
        .withMessage("Language must be one of the predefined options"),

    body("rating")
        .notEmpty()
        .withMessage("Rating is required")
        .isFloat({min: 0, max: 5})
        .withMessage("Rating must be a number between 0 and 5"),
];