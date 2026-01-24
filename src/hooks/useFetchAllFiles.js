import { useEffect, useState } from "react"
import { CONFIG } from "../utils/config";

const useGetAllFiles = (prefix="", shouldRefresh) => {
    
    const [files, setFiles] = useState([]);
    const [loading , setLoading ] = useState(false);
    const [error , setError ] = useState(null);

    const fetchFiles = async () => {
        try {
            setLoading(true)
            const finalUrl = `${CONFIG.BASE_URL}/files?folder=${prefix ?? ""}`
            const response = await fetch(finalUrl)
            const data = await response.json();
            setFiles(data)
        } catch (error) {   
            setError(error)
   
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
       fetchFiles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ prefix, shouldRefresh])

    return { files , loading , error }
}

export default useGetAllFiles