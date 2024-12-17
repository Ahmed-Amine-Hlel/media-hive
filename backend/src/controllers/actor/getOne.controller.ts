import {Request, Response} from 'express';
import {CustomError} from "../../types/CustomError";
import {getActorById} from "../../services/actor/getOne.service";

export const getActorByIdHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const actor = await getActorById(id);
        res.status(200).json({
            id: actor.id,
            fullName: actor.fullName,
            dateOfBirth: actor.dateOfBirth,
            image: actor.image,
            createdAt: actor.createdAt,
            updatedAt: actor.updatedAt
        });

    } catch (error: any) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({message: error.message});
        } else {
            res.status(500).json({message: "Internal server error. Please try again later."});
        }
    }

}