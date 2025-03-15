import React from 'react'
import { useSidebar } from '../../hooks/useSidebar'
const dashboard = () => {
    const {isSidebarOpen, toggleSidebar} = useSidebar()
  return (
    <>
        <div className={`${isSidebarOpen ? 'p-6 lg:ml-56' : 'p-4 lg:ml-16'}`} >
            <div>

            welcome
            </div>
    </div>
    </>

  )
}

export default dashboard;
