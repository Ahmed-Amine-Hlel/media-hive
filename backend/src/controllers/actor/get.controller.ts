import {Request, Response} from "express";
import {CustomError} from "../../types/CustomError";
import {IActor} from "../../types/Actor";
import {getActors} from "../../services/actor/get.service";

export const getActorsHandler = async (req: Request, res: Response): Promise<void> => {

    try {

        const actors: IActor[] = await getActors();

        const mappedActors = actors.map(actor => {
            return {
                id: actor.id,
                fullName: actor.fullName,
                dateOfBirth: actor.dateOfBirth,
                image: actor.image,
                createdAt: actor.createdAt,
                updatedAt: actor.updatedAt
            }
        })

        res.status(200).json(mappedActors);

    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({message: error.message});
        } else {
            res.status(500).json({message: "Internal server error. Please try again later."});
        }
    }

}