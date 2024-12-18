import {Actor} from "@/types/Actor";
import axiosInstance from "@/config/axiosInstance";


interface UpdateActorData {
    fullName: string;
    dateOfBirth: Date;
    image: string;
}

export const updateActor = async (id: string, data: UpdateActorData): Promise<Actor> => {
    try {
        const response = await axiosInstance.put<Actor>(`/actor/${id}`, {
            ...data,
            dateOfBirth: data.dateOfBirth.toISOString().split('T')[0]
        });
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}