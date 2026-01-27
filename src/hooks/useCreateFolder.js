import { CONFIG } from "../utils/config"

const useCreateFolderMutation = () => {
  const createFolder = async(folderName,id) => {

    try {
        const response = await fetch(`${CONFIG.BASE_URL}/directory/create`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: folderName,
                parentDirId: id
            }),
            credentials: "include"
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