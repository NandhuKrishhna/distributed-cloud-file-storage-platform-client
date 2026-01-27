import toast from "react-hot-toast";
import { CONFIG } from "../utils/config";

const useDeleteFiles = () => {
    const deleteFile = async (id) => {
        try {
            const response = await fetch(`${CONFIG.BASE_URL}/files/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error("Failed to delete file");
            }
            toast.success(response.message || "File deleted successfully")
            return true;
        } catch (error) {
            console.error("Error deleting file:", error);
            toast.error(error.message || "Failed to delete file")
            return false;
        }
    };
    return { deleteFile };
};

export default useDeleteFiles;