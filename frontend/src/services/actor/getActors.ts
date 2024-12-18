import {Actor} from "@/types/Actor";
import axiosInstance from "@/config/axiosInstance";


export const getActors = async (): Promise<Actor[]> => {
    try {

        const response = await axiosInstance.get<Actor[]>(`/actor`);
        return response.data;

    } catch (error) {
        return Promise.reject(error);
    }
}