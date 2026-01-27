import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CONFIG } from "../../utils/config";
import toast from "react-hot-toast";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${CONFIG.BASE_URL}/auth/logout`, {
                credentials: "include"
            });
            
            if (response.ok) {
                localStorage.removeItem("user");
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

    return { logout, loading };
};

export default useLogout;
