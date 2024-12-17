import {CustomError} from "../../types/CustomError";
import Actor from "../../models/actor.model";


export const deleteActor = async (id: string): Promise<void> => {

    try {

        const actor = await Actor.findOne({_id: id});
        if (!actor) {
            return Promise.reject(new CustomError("Actor not found", 404));
        }

        await Actor.deleteOne({_id: id});

    } catch (error: any) {
        return Promise.reject(new CustomError("Unable to delete actor. Please try again later.", 500));
    }

}