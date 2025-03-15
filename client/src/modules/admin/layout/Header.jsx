import { useState, useEffect } from "react";
import { useSidebar } from "../hooks/useSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons";
import userMan from "../../../assets/images/man.png";
import "../css/Animation.css";

const Header = () => {
  const { isSidebarOpen } = useSidebar();
  const [hasNewNotifications, setHasNewNotifications] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasNewNotifications(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header
      className={`sticky top-0 bg-white p-4 flex items-center justify-end ${
        isSidebarOpen ? "lg:ml-56" : "lg:ml-16"
      } space-x-4 z-10`}
    >
      {/* Search Field */}
      <div className="flex-1 lg:ml-0 sm:ml-56 hidden lg:block">
        <input
          type="text"
          placeholder="Search patients..."
          className="p-2 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-700 bg-white dark:bg-gray-800 text-black dark:text-gray-100"
        />
      </div>
      <button className="relative p-2">
        <FontAwesomeIcon
          icon={faBell}
          size={20}
          className="text-gray-500"
        />
        <span
          className={`absolute top-0 right-1 b text-forestGreen text-2xl font-bold rounded-full w-3 h-3 flex items-center justify-center ${
            hasNewNotifications ? "shakeIcon" : ""
          }`}
        >
          .
        </span>
      </button>

      <div className="text-gray-300 "> | </div>

      {/* User Profile */}
      <div className="flex items-center gap-2 space-x-2">
        <span className="sr-only">Open user menu</span>
        <img className="w-7 h-7 rounded-full" src={userMan} alt="user photo" />

        <span className="font-suse font-medium text-md hidden lg:inline">
          Harry Scofield
        </span>
        <span>
          {" "}
          <FontAwesomeIcon icon={faArrowAltCircleDown} className="text-gray-300" />{" "}
        </span>
      </div>
    </header>
  );
};

export default Header;
