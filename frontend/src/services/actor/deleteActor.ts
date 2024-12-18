import axiosInstance from "@/config/axiosInstance";


export const deleteActor = async (id: string): Promise<void> => {
    try {
        await axiosInstance.delete<void>(`/actor/${id}`);
    } catch (error) {
        return Promise.reject(error);
    }
};