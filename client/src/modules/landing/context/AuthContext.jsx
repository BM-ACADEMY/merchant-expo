import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      console.log("User logged in with token:", user);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken);
  };

  const loginWithOtp = (mobile, otp) => {
    console.log("Logging in with OTP:", mobile, otp);
    setUser({ mobile });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, loginWithOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
