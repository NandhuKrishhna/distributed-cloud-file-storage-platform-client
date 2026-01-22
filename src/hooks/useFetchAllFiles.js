import { useEffect, useState } from "react"
import { CONFIG } from "../utils/config";

const useGetAllFiles = (prefix="") => {
    
    const [files, setFiles] = useState([]);
    const [loading , setLoading ] = useState(false);
    const [error , setError ] = useState(null);

    const fetchFiles = async () => {
        try {
            setLoading(true)
            const finalUrl = prefix? `${CONFIG.BASE_URL}/${prefix}`:CONFIG.BASE_URL
            console.log("finalUrl",finalUrl)
            const response = await fetch(finalUrl)
            const data = await response.json();
            setFiles(data)
        } catch (error) {   
            setError(error)
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
       fetchFiles()
    },[prefix])

    return { files , loading , error }
}

export default useGetAllFiles