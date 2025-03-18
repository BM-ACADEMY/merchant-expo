import React from 'react';
import {useSidebar} from "../../hooks/useSidebar";

const Complaint = () => {
  const {isSidebarOpen, toggleSidebar} = useSidebar()
  return (
    <>
    
    <div className={`${isSidebarOpen ? 'p-6 lg:ml-56' : 'p-4 lg:ml-16'}`}>
      welcome to complaint
    </div>
    </>
  )
}

export default Complaint;
