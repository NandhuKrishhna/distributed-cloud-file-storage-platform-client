import { CONFIG } from "../utils/config"

const useRenameFile = ()=>{

   const renameFile = async(oldName, newName, folder="")=>{
    try {
        const response = await fetch(`${CONFIG.BASE_URL}?action=rename`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                oldName,
                newName,
                folder
            })
        })
        const data = await response.json()
        console.log("data", data)
    } catch (error) {
        console.error("Error renaming file:", error)
    }
   }

    return { renameFile }
}

export default useRenameFile