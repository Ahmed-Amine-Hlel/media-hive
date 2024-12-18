import {Actor} from "@/types/Actor";
import axiosInstance from "@/config/axiosInstance";


interface AddActorData {
    fullName: string;
    dateOfBirth: Date;
    image: string;
}

export const addActor = async (data: AddActorData): Promise<Actor> => {
    try {
        const response = await axiosInstance.post<Actor>("/actor", {
            ...data,
            dateOfBirth: data.dateOfBirth.toISOString().split('T')[0]
        });
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}