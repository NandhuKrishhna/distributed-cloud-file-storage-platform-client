
import { useState } from "react";
import { CONFIG } from "../../utils/config";
import toast from "react-hot-toast";
const useRegisterUserMutation = () => { 
    const [isLoading , setIsLoading] = useState(false)
    const registerUserMutation = async (name,email,password) => {
          try {
            setIsLoading(true)
            const response = await fetch(`${CONFIG.BASE_URL}/auth/register`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({name,email,password}),
                credentials : "include"
            })
         
            const data = await response.json()
               if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
            return data
          } catch (error) {
            console.log({error:error})
            toast.error(error.message || "Something went wrong")
          }finally{
            setIsLoading(false)
          }
    }

    return {
        registerUserMutation,
        isLoading
    }
}


export default useRegisterUserMutation