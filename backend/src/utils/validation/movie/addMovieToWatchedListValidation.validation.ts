import {body} from 'express-validator';

export const validateAddMovieToWatchedList = [
    body('rating')
        .isFloat({min: 0, max: 5})
        .withMessage('Rating must be between 0 and 5'),

    body('review')
        .isString()
        .optional()
        .isLength({min: 1, max: 500})
        .withMessage('Review must be between 1 and 500 characters'),
];