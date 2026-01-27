import { useState, useEffect } from "react";
import { CONFIG } from "../../utils/config";

const useCheckAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${CONFIG.BASE_URL}/auth/`, {
                    credentials: "include"
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }
                const data = await response.json();
                setUser(data);
                // Sync with localStorage just in case, or we rely on the cookie mainly
                localStorage.setItem("user", JSON.stringify(data));
            } catch (err) {
                console.error("Auth check failed:", err);
                setError(err);
                setUser(null);
                // If the cookie check fails, we might want to clear localStorage too to keep them in sync
                localStorage.removeItem("user");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, error };
};

export default useCheckAuth;
