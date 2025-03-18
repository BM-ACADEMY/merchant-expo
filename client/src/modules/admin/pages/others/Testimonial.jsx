import React from "react";
import {useSidebar} from "../../hooks/useSidebar";
const Testimonial = () => {
  const {isSidebarOpen, toggleSidebar} = useSidebar()
  return (
    <>
      <div className={`${isSidebarOpen ? 'p-6 lg:ml-56' : 'p-4 lg:ml-16'}`}>welcome to testimonial</div>
    </>
  );
};

export default Testimonial;
