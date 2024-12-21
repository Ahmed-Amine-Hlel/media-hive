import {Genre} from "@/types/Genre";
import axiosInstance from "@/config/axiosInstance";

interface UpdateGenreData {
    name: string;
    description: string;
}

export const updateGenre = async (id: string, data: UpdateGenreData): Promise<Genre> => {
    try {
        const response = await axiosInstance.put<Genre>(`/genre/${id}`, {
            ...data
        });

        return response.data;

    } catch (error) {
        return Promise.reject(error);
    }
}
