import React, { useState } from "react";
import { useSidebar } from "../../hooks/useSidebar";
import UserTable from "./UserTable";

const Users = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className={`${isSidebarOpen ? "p-6 lg:ml-56" : "p-4 lg:ml-16"}`}>
<<<<<<< HEAD

=======
      <UserTable />
>>>>>>> 43bf87938f46e2a896cd85e39d2b2870aeb50c40
    </div>
  );
};

export default Users;
