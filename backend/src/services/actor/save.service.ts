import {IActor} from "../../types/Actor";
import {CustomError} from "../../types/CustomError";
import Actor from "../../models/actor.model";


interface SaveActorPayload {
    fullName: string;
    dateOfBirth: Date;
    image: string;
}

export const saveActor = async (payload: SaveActorPayload): Promise<IActor> => {
    try {

        const actor: IActor = new Actor({
            fullName: payload.fullName,
            dateOfBirth: new Date(payload.dateOfBirth),
            image: payload.image,
        });
        await actor.save();

        return actor;

    } catch (error) {
        return Promise.reject(new CustomError("Unable to save actor. Please try again later.", 500));
    }
}