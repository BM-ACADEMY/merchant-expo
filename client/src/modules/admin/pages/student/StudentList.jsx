import React from 'react'
import {useSidebar} from "../../hooks/useSidebar";

import AllStudents from "./AllStudents";

import AddStudent from "./AddStudent";

const StudentList = () => {
      const {isSidebarOpen, toggleSidebar} = useSidebar()
  return (
   <>
    <div className={`${isSidebarOpen ? 'p-6 lg:ml-56' : 'p-4 lg:ml-16'}`}>

    <AddStudent />

    </div>
   </>
  )
}

export default StudentList;
