import { CONFIG } from "../utils/config"

const useRenameFile = ()=>{

   const renameFile = async(fileId,newName)=>{
    try {
      await fetch(`${CONFIG.BASE_URL}/files/rename/${fileId}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newName
            }),
            credentials: "include"
        })
      
    } catch (error) {
        console.error("Error renaming file:", error)
    }
   }

    return { renameFile }
}

export default useRenameFile