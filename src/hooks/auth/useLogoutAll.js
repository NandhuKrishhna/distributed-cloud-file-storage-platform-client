import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CONFIG } from "../../utils/config";
import toast from "react-hot-toast";

const useLogoutAll = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const logoutAll = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${CONFIG.BASE_URL}/auth/logout-all`, {
                credentials: "include"
            });
            
            if (response.ok) {
                toast.success("Logged out successfully");
                navigate("/login");
            } else {
                toast.error("Logout failed");
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Error during logout");
        } finally {
            setLoading(false);
        }
    };

    return { logoutAll, loading };
};

export default useLogoutAll;
