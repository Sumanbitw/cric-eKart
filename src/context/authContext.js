import axios from "axios";
import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("auth-user"))
  );

  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth-token"))
  );

  if (token) {
    console.log("token set");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  axios.interceptors.response.use(undefined, function (error) {
    if (
      error.response.status === 401 ||
      error.response.status === 403 ||
      error.response.data.message === "authorization failed"
    ) {
      logout();
    }
    return Promise.reject(error);
  });

  const loginUserWithCredentials = async (email, password) => {
    try {
      const {
        data: { user, token, success, message },
      } = await axios.post(`https://crickart.herokuapp.com/login`, {
        email,
        password,
      });
      if (success) {
        setUser(user);
        setToken(token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("auth-user", JSON.stringify(user));
        localStorage.setItem("auth-token", JSON.stringify(token));
      }
      return { user, success, message };
    } catch (error) {
      console.log(error);
      return { user: null, message: error.message, success: false };
    }
  };

  const createUserWithCredentials = async (name, email, password) => {
    try {
      const {
        data: { user, token, success, message },
      } = await axios.post(`https://crickart.herokuapp.com/signup`, {
        name: name,
        email: email,
        password: password,
      });
      if (success) {
        setUser(user);
        setToken(token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("auth-user", JSON.stringify(user));
        localStorage.setItem("auth-token", JSON.stringify(token));
      }
      return { user, success, message };
    } catch (error) {
      console.log(error);
      return { message: error.message, success: false };
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    axios.defaults.headers.common["Authorization"] = null;
    localStorage.removeItem("auth-user");
    localStorage.removeItem("auth-token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loginUserWithCredentials,
        createUserWithCredentials,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
