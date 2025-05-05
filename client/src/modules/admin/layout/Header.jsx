// import { useState, useEffect } from "react";
// import { useSidebar } from "../hooks/useSidebar";
// import { Bell,ChevronDown } from "lucide-react";
// import userMan from "../../../assets/images/man.png";
// import RequestNotification from "../utils/RequestNotification"; // Import the NotificationComponent
// import "../css/Animation.css";

// const Header = () => {
//   const { isSidebarOpen } = useSidebar();
//   const [hasNewNotifications, setHasNewNotifications] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setHasNewNotifications(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);
//   const [showNotifications, setShowNotifications] = useState(false);

//   const toggleNotifications = () => {
//     setShowNotifications(!showNotifications);
//   };
//   return (
//     <header
//       className={`sticky top-0 bg-white p-4 flex items-center justify-between space-x-4 z-10`}
//     >
//       {/* Notification Icon */}
//       <div className="relative">
//       <Bell size={22} className="text-gray-500 border border-black" />

//         <span
//           className={`absolute top-0 right-1 text-forestGreen text-2xl font-bold rounded-full w-3 h-3 flex items-center justify-center ${
//             hasNewNotifications ? "shakeIcon" : ""
//           }`}
//         >
//           .
//         </span>
//       </div>

//       {/* Notification Dropdown (Conditional Rendering) */}
//       <RequestNotification /> {/* Display Notifications */}

//       {/* User Profile */}
//       <div className="flex items-center gap-2 space-x-2">
//         <img className="w-7 h-7 rounded-full" src={userMan} alt="user photo" />
//         <span className="font-suse font-medium text-md hidden lg:inline">
//           Harry Scofield
//         </span>
//         <span>
//           {" "}
//           <ChevronDown size={20} className="text-gray-300" />
//         </span>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState, useEffect } from 'react';
import { useSidebar } from '../hooks/useSidebar';
import { Bell, ChevronDown, MessageSquare } from 'lucide-react';
import NotificationBell from '../utils/NotificationBell';
import "../css/Animation.css";
import AdminBreadcrumb from '../utils/AdminBreadcrumb';
import SearchCommand from '../utils/SearchCommand';
import { Link } from 'react-router-dom';

// Temporary user photo URL
const userPhoto = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const Header = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <header
      className={`sticky top-0 bg-white p-4 flex items-center justify-end ${isSidebarOpen ? "lg:ml-56" : "lg:ml-16"
        } space-x-4 z-10`}
    >
      {/* Logo or Brand */}
      <div className='w-full flex justify-between'>
        <div className="text-xl font-semibold">  <AdminBreadcrumb /></div>
        <div>
          <SearchCommand />
        </div>
        {/* Right side elements */}
        <div className="flex items-center space-x-6">
          {/* Notification Bell */}
          <NotificationBell />
          <Link to="/admin/chat" className="relative group">
            <MessageSquare className="relative p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none" />
            <span className="sr-only">Messages</span>
          </Link>
          {/* User Profile */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <img
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
              src={userPhoto}
              alt="User profile"
            />
         <Link to="/admin/settings">
         <span className="font-medium text-sm hidden sm:inline group-hover:text-blue-600 transition-colors">
              Harry Scofield
            </span>
         </Link>
         <Link to="/admin/settings">
         <ChevronDown size={16}  className="text-gray-400 group-hover:text-blue-600 transition-colors" /></Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;