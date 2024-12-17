import {IActor} from "../../types/Actor";
import {CustomError} from "../../types/CustomError";
import Actor from "../../models/actor.model";


interface UpdateActorPayload {
    fullName: string;
    dateOfBirth: Date;
    image: string;
}


export const updateActor = async (id: string, payload: UpdateActorPayload): Promise<IActor> => {
    try {

        const actor: IActor | null = await Actor.findOne({_id: id});
        if (!actor) {
            return Promise.reject(new CustomError("Actor not found", 404));
        }

        actor.fullName = payload.fullName;
        actor.dateOfBirth = new Date(payload.dateOfBirth);
        actor.image = payload.image;

        await actor.save();

        return actor;

    } catch (error) {
        return Promise.reject(new CustomError("Unable to update actor. Please try again later.", 500));
    }

}