import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Loader from "../components/Loader";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const http = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authToken = cookies.authToken;
      if (authToken) {
        http.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await http.post("/api/login", { email, password });
      // console.log(response);
      const authToken = response.data.token;
      setCookie("authToken", authToken, { path: "/" });
      http.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
      setIsLoggedIn(true);
      // console.log(authToken);

      return response.data.user;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await http.post("/api/logout");
      removeCookie("authToken", { path: "/" });
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading }}>
      {isLoading ? ( // Render loading indicator if isLoading is true
        <Loader />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
