import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: string;
  role: number;
  first_name: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      console.log("Stored user found:", storedUser);
      const parsedUser = JSON.parse(storedUser);
      setUser({
        ...parsedUser,
        role: Number(parsedUser.role),
      });
      setLoading(false);
    } else {
      const fetchUser = async () => {
        try {
          const id = localStorage.getItem("id");
          const token = localStorage.getItem("authToken");
          if (!id || !token) {
            throw new Error("User ID or token not found");
          }

          const response = await axios.get(
            `http://localhost:3000/api/users/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("useAuth - Fetched user:", response.data);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, []);

  return { user, loading };
};
