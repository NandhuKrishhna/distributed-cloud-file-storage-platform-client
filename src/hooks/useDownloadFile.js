import { CONFIG } from "../utils/config"

const useDownloadFile = () => {
    const downloadFile = async (fileName) => {
        try {
            const fileUrl = `${CONFIG.BASE_URL}/files/download?filePath=${fileName}`
            const response = await fetch(fileUrl, {
                credentials: "include"
            })
            if (!response.ok) {
                throw new Error('Failed to download file')
            }
            console.log(response)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = fileName
            document.body.appendChild(a)
            a.click()
            a.remove()
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error downloading file:', error)
        }
    }

    return { downloadFile }
}

export default useDownloadFile