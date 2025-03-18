import React from 'react';
import { useSidebar } from '../../hooks/useSidebar';

const DeepSubCategory = () => {
   const {isSidebarOpen, toggleSidebar} = useSidebar()
  return (
    <div className={`${isSidebarOpen ? 'p-6 lg:ml-56' : 'p-4 lg:ml-16'}`}>
      welcome to deep sub 
    </div>
  )
}

export default DeepSubCategory;
