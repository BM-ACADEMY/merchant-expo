import { Outlet } from "react-router-dom";
<<<<<<< HEAD
import Sidebar from "./layout/Sidebar"; // Admin Sidebar
import Header from "./layout/Header"; // Admin Header
=======
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";

>>>>>>> Charles_bm

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Header />
<<<<<<< HEAD
      <div className="content">
        <Sidebar />
        <main>
=======
      <div className="content flex">
        <Sidebar />
        <main className="flex-1 p-4">
         {/* Show Breadcrumb here */}
>>>>>>> Charles_bm
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
