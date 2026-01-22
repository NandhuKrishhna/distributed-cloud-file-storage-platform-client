import { CONFIG } from "../utils/config"

const useDownloadFile = () => {
    const downloadFile = (fileName) => {
        try {
            const fileUrl = `${CONFIG.BASE_URL}/${fileName}?download=true`
            window.location.href = fileUrl
        } catch (error) {
            console.error('Error downloading file:', error)
        }
    }

    return { downloadFile }
}

export default useDownloadFile