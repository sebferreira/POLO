/* eslint-disable react-refresh/only-export-components */
import {createContext, useContext, useEffect, useState} from "react";
import {loginRequest, registerRequest, verifyTokenRequest} from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuthRegistered, setIsAuthRegistered] = useState(false);
  const [loginErrors, setLoginErrors] = useState([]);
  const [registerErrors, setRegisterErrors] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const signup = async (value) => {
    try {
      const res = await registerRequest(value);
      setUser(res.data);
      setIsAuthRegistered(true);
      setRegisterErrors([]);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setRegisterErrors(error.response.data);
      }
      setRegisterErrors([error.response.data.message]);
    }
  };
  const signin = async (value) => {
    try {
      const res = await loginRequest(value);
      setUser(res.data);
      setIsAuthenticated(true);
      setLoginErrors([]);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setLoginErrors(error.response.data);
      }
      setLoginErrors([error.response.data.message]);
    }
  };
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
    setIsAuthRegistered(false);
    console.log("User logged out");
  };
  useEffect(() => {
    if (registerErrors.length > 0) {
      const timer1 = setTimeout(() => {
        setRegisterErrors([]);
      }, 5000);
      return () => clearTimeout(timer1);
    }
    if (loginErrors.length > 0) {
      const timer2 = setTimeout(() => {
        setLoginErrors([]);
      }, 5000);
      return () => clearTimeout(timer2);
    }
  }, [loginErrors, registerErrors]);

  useEffect(() => {
    async function checkLogin() {
      const cookie = Cookies.get();
      if (!cookie.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(cookie.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setUser(res.data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        loading,
        isAuthRegistered,
        isAuthenticated,
        loginErrors,
        registerErrors,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
