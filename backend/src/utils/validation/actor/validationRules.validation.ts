import {body} from 'express-validator';

export const actorValidationRules = [
    body('fullName')
        .isString().withMessage('Full name must be a string')
        .notEmpty().withMessage('Full name is required')
        .isLength({max: 100}).withMessage('Full name should not exceed 100 characters'),

    body('dateOfBirth')
        .isString().withMessage('Date of birth must be a string')
        .notEmpty().withMessage('Date of birth is required')
        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Invalid date of birth format'),
    body('image')
        .isString().withMessage('Image URL must be a string')
        .notEmpty().withMessage('Image URL is required')
        .matches(/^(http|https):\/\/[^\s]+$/i).withMessage('Invalid image URL format'),
];
