import {body} from "express-validator";

export const addRemoveActorToMovieValidationRules = [
    body("actorId")
        .notEmpty()
        .withMessage("Actor ID is required")
        .isMongoId()
        .withMessage("Actor ID must be a valid MongoDB ID"),
];