import { Outlet } from "react-router-dom";
import Sidebar from "./layout/Sidebar"; // Admin Sidebar
import Header from "./layout/Header"; // Admin Header

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Header />
      <div className="content">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
