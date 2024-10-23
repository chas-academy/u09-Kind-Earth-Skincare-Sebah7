import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

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
    const token = localStorage.getItem("authToken");

    if (storedUser && token) {
      console.log("Stored user found:", storedUser);
      const parsedUser = JSON.parse(storedUser);

      const tokenExpiration = JSON.parse(atob(token.split(".")[1])).exp * 1000;
      if (Date.now() >= tokenExpiration) {
        console.log("Token expired");
        logout();
        setLoading(false);
        return;
      }

      setUser({
        ...parsedUser,
        role: Number(parsedUser.role),
      });
      setLoading(false);
    } else {
      const id = localStorage.getItem("id");
      if (id && token) {
        const fetchUser = async () => {
          try {
            const response = await axiosInstance.get(`/users/${id}`);
            console.log("useAuth - Fetched user:", response.data);
            setUser(response.data);
          } catch (error) {
            console.error("Error fetching user:", error);
            if (
              (error as any).response &&
              (error as any).response.status === 401
            ) {
              logout();
            }
          } finally {
            setLoading(false);
          }
        };

        fetchUser();
      } else {
        setLoading(false);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return { user, loading, logout };
};
