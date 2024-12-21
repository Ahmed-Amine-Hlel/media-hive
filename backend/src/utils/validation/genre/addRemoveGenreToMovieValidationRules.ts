

import {body} from "express-validator";

export const addRemoveGenreToMovieValidationRules = [
    body("genreId")
        .notEmpty()
        .withMessage("Actor ID is required")
        .isMongoId()
        .withMessage("Actor ID must be a valid MongoDB ID"),
];