import {Genre} from "@/types/Genre";
import axiosInstance from "@/config/axiosInstance";

interface AddGenreData {
    name: string;
    description: string;
}

export const addGenre = async (data: AddGenreData): Promise<Genre> => {
    try {
        const response = await axiosInstance.post<Genre>("/genre", {
            ...data
        });

        return response.data;

    } catch (error) {
        return Promise.reject(error);
    }
}
