import axiosInstance from "@/config/axiosInstance";


export const deleteGenre = async (id: string): Promise<void> => {
    try {
        await axiosInstance.delete(`/genre/${id}`);
    } catch (error) {
        return Promise.reject(error);
    }
}