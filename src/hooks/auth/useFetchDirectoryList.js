import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CONFIG } from "../../utils/config";

const useFetchAllDirectory = (directoryId, shouldRefresh) => {
    const navigate = useNavigate();
    const [directories, setDirectories] = useState([]);
    const [loading , setLoading ] = useState(false);
    const [error , setError ] = useState(null);
    const [currentDirectory, setCurrentDirectory] = useState(null);

    const fetchDirectory = async (id) => {
        try {
            setLoading(true)
            setError(null) 
            
            const finalUrl = id ? `${CONFIG.BASE_URL}/directory/${id}` : `${CONFIG.BASE_URL}/directory`
            const response = await fetch(finalUrl, { credentials: "include" })

            if (response.status === 401) {
                toast.error("Unauthorized! Please login.")
                navigate("/login")
                return;
            }

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
            }
            setDirectories(data?.data.docs)
            setCurrentDirectory(data?.currentDirectory)

        } catch (err) { 
            console.error("Fetch Error:", err.message)
            setError(err.message) 
            setDirectories([]) 
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
       fetchDirectory(directoryId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[directoryId, shouldRefresh])

    return { directories, loading, error, currentDirectory }
}

export default useFetchAllDirectory