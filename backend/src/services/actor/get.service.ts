import {IActor} from "../../types/Actor";
import {CustomError} from "../../types/CustomError";
import Actor from "../../models/actor.model";


export const getActors = async (): Promise<IActor[]> => {
    try {

        const actors: IActor[] = await Actor.find();
        return actors;

    } catch (error) {
        return Promise.reject(new CustomError("Unable to fetch actors. Please try again later.", 500));
    }
}