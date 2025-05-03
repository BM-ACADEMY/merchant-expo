import { createContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";

export const AuthContext = createContext(null);

// Use a secure and unique key in real-world applications (consider storing it in an env variable)
const SECRET_KEY =import.meta.env.VITE_SECRET_KEY;

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (cipherText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (err) {
    console.error("Decryption failed:", err);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const encryptedUser = localStorage.getItem("user");
    return encryptedUser ? decryptData(encryptedUser) : null;
  });

  useEffect(() => {
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", encryptData(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", encryptData(userData));
  };

  const loginWithOtp = (mobile, otp) => {
    const userData = { mobile };
    setUser(userData);
    localStorage.setItem("user", encryptData(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, loginWithOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
