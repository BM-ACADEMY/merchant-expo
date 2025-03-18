import React, { useEffect, useState } from "react";
import axios from "axios";
import {useSidebar} from "../../hooks/useSidebar";

const MerchantList = () => {
  const {isSidebarOpen, toggleSidebar} = useSidebar()
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    axios
      .get("/api/merchants")
      .then((res) => setMerchants(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className={`${isSidebarOpen ? 'p-6 lg:ml-56' : 'p-4 lg:ml-16'}`}>welcome to merchant</div>
    </>
  );
};

export default MerchantList;
