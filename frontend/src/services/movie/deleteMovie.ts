import axiosInstance from "@/config/axiosInstance";


export const deleteMovie = async (id: string): Promise<void> => {
    try {
        await axiosInstance.delete(`/movie/${id}`);
    } catch (error) {
        return Promise.reject(error);
    }
}