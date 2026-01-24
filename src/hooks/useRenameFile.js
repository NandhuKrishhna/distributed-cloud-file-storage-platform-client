import { CONFIG } from "../utils/config"

const useRenameFile = ()=>{

   const renameFile = async(oldName, newName, folder="")=>{
    try {
      await fetch(`${CONFIG.BASE_URL}/files/rename/${oldName}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newName,
                folder
            })
        })
      
    } catch (error) {
        console.error("Error renaming file:", error)
    }
   }

    return { renameFile }
}

export default useRenameFile