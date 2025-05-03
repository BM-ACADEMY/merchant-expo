import { Outlet } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";


const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Header />
      <div className="content flex">
        <Sidebar />
        <main className="flex-1 p-4">
         {/* Show Breadcrumb here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
