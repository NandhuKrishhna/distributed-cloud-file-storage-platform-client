import { CONFIG } from "../utils/config";

const useDeleteFiles = () => {
    const deleteFile = async (filePath) => {
        try {
            const response = await fetch(`${CONFIG.BASE_URL}/${filePath}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete file");
            }
            return true;
        } catch (error) {
            console.error("Error deleting file:", error);
            return false;
        }
    };
    return { deleteFile };
};

export default useDeleteFiles;