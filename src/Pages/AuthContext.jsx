import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Base URL config - Postman/Frontend connectivity sync
axios.defaults.baseURL = "http://localhost:5000";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Logout Method
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  // Initialize Auth State on Mount / Page Refresh
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken) {
        setToken(storedToken);
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${storedToken}`;

        if (storedUser && storedUser !== "undefined") {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            console.error("Failed to parse stored user:", e);
            logout();
          }
        } else {
          // Fetch real user profile if token exists but local state is empty
          try {
            const res = await axios.get("/api/auth/profile");
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
          } catch (err) {
            console.error("Failed to restore session:", err);
            logout();
          }
        }
      } else {
        delete axios.defaults.headers.common["Authorization"];
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Login Method
  const login = (authToken, userData) => {
    setToken(authToken);
    setUser(userData);

    // Save to LocalStorage
    localStorage.setItem("token", authToken);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    }

    // Configure global Axios authorization header
    axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook Export
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
