import {Request, Response} from "express";
import {CustomError} from "../../types/CustomError";
import {IActor} from "../../types/Actor";
import {saveActor} from "../../services/actor/save.service";


export const saveActorHandler = async (req: Request, res: Response): Promise<void> => {
    try {

        const payload = req.body;
        const actor: IActor = await saveActor(payload);

        res.status(201).json({
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