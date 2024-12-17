import {IActor} from "../../types/Actor";
import {CustomError} from "../../types/CustomError";
import Actor from "../../models/actor.model";


export const getActorById = async (id: string): Promise<IActor> => {

    try {

        const actor: IActor | null = await Actor.findOne({_id: id});
        if (!actor) {
            return Promise.reject(new CustomError("Actor not found", 404));
        }

        return actor;

    } catch (error) {
        return Promise.reject(new CustomError("Unable to fetch actor. Please try again later.", 500));
    }
}