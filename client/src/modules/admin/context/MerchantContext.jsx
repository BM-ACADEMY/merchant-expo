// src/context/MerchantContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const MerchantContext = createContext();

export const useMerchant = () => useContext(MerchantContext);

export const MerchantProvider = ({ children }) => {
  const [selectedMerchant, setSelectedMerchant] = useState(null);

  // Load from localStorage on first load
  useEffect(() => {
    const merchantFromStorage = localStorage.getItem("selectedMerchant");
    if (merchantFromStorage) {
      setSelectedMerchant(JSON.parse(merchantFromStorage));
    }
  }, []);

  // Save to localStorage every time it's updated
  useEffect(() => {
    if (selectedMerchant) {
      localStorage.setItem("selectedMerchant", JSON.stringify(selectedMerchant));
    } else {
      localStorage.removeItem("selectedMerchant");
    }
  }, [selectedMerchant]);

  return (
    <MerchantContext.Provider value={{ selectedMerchant, setSelectedMerchant }}>
      {children}
    </MerchantContext.Provider>
  );
};
