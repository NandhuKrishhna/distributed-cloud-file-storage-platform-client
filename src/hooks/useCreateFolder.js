import { CONFIG } from "../utils/config"

const useCreateFolderMutation = () => {
  const createFolder = async(folderPath="", folderName) => {

    try {
        const response = await fetch(`${CONFIG.BASE_URL}/folder/create?directoryPath=${folderPath}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                folderName: folderName
            })
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
    
  }

  return {
    createFolder
  }
}


export default useCreateFolderMutation