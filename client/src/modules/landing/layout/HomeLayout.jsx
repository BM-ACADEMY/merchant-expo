import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const HomeLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Sticky Header */}
      <Header className="sticky top-0 z-50 bg-white shadow-md" />

      {/* Scrollable Content (Main + Footer) */}
      <div className="flex-1 overflow-y-auto flex-grow">
        <main >
          <Outlet />
        </main>
        <Footer />
      </div>
   
    </div>
  );
  };
  
  export default HomeLayout;
  
  

