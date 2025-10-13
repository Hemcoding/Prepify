import React, { createContext, useState, useEffect } from "react";
import { getUser, logoutUser } from "../Api/authService";
import toast from "react-hot-toast";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openLogoutAlert, setOpenLogoutAlert] = useState(false);

  useEffect(() => {
    if (user) return;

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getUser();
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

console.log("userrrrr: ", user)

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("accessToken", userData.accessToken); // Update token in localStorage
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("accessToken"); // Clear token from localStorage
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await logoutUser();
      if (response.success) {
        setLoading(false);
        localStorage.clear();
        clearUser();
        toast.success("Logged out successfully");
      }
      return response.success
    } catch (error) {
      toast.error(error.response?.data.message || "Somthing went wrong");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        updateUser,
        clearUser,
        handleLogout,
        setOpenLogoutAlert,
        openLogoutAlert,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
