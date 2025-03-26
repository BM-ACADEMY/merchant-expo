import { useEffect, useState } from "react";

const useAuth = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Fetch role from localStorage or API
    const userRole = localStorage.getItem("userRole") || "common-user";
    setRole(userRole);
  }, []);

  return { role };
};

export default useAuth;
