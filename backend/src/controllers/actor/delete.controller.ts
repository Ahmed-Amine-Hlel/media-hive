import {Request, Response} from 'express';
import {deleteActor} from "../../services/actor/delete.service";
import {CustomError} from "../../types/CustomError";

export const deleteActorHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        await deleteActor(id);

        res.status(200).json({message: "Actor deleted successfully"});

    } catch (error: any) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({message: error.message});
        } else {
            res.status(500).json({message: "Internal server error. Please try again later."});
        }
    }
}