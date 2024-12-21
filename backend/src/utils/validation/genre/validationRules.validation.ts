import {body} from 'express-validator';

export const genreValidationRules = [
    body('name')
        .isString().withMessage('Name must be a string')
        .notEmpty().withMessage('Name is required')
        .isLength({max: 100}).withMessage('Name should not exceed 100 characters'),

    body('description')
        .isString().withMessage('Description must be a string')
        .notEmpty().withMessage('Description is required')
        .isLength({max: 500}).withMessage('Description should not exceed 500 characters'),
];
