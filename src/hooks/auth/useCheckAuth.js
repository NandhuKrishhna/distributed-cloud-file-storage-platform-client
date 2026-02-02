import { useState, useEffect } from "react";
import { CONFIG } from "../../utils/config";

const useCheckAuth = ({ refetch }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${CONFIG.BASE_URL}/auth`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("Auth check failed:", err);
        setError(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [refetch]);

  return { user, loading, error };
};

export default useCheckAuth;
