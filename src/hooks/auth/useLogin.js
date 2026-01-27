import { useState } from "react";
import toast from "react-hot-toast";
import { devLog } from "../../utils/dev_log";
import { CONFIG } from "../../utils/config";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${CONFIG.BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials : "include"
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      toast.success(data.message || "Login successful");
      setLoading(false);
      return true;
    } catch (error) {
      devLog(error);
      toast.error(error.message || "Error logging in");
      setLoading(false);
      return false;
    }
  };

  return {
    login,
    loading
  };
};


export default useLogin