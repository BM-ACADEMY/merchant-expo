import React from 'react';
import { useSidebar } from '../../hooks/useSidebar';
const SuperSubCategory = () => {
       const {isSidebarOpen, toggleSidebar} = useSidebar()
  return (
 <>
    <div className={`${isSidebarOpen ? 'p-6 lg:ml-56' : 'p-4 lg:ml-16'}`}>
      Super sub category
    </div>
 </>
  )
}

export default SuperSubCategory;
