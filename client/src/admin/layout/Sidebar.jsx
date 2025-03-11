import React, { useState } from "react";

import {
  HouseSimple,
  UsersThree,
  Heartbeat,
  Calendar,
  Coins,
  Scroll,
  FirstAidKit,
  Storefront,
  Megaphone, 
  GearSix,
  SignOut,
  List,
  ArrowCircleLeft,
  CaretDown,
} from "phosphor-react";
import bird from "../../assets/images/bird.png";
import easyCol from "../../assets/images/EasyColllll.png";
import { Link } from "react-router-dom";
import { useSidebar } from "../hooks/useSidebar"; // Correct path to SidebarContext

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem((prev) => (prev === item ? null : item));
  };

  return (
    <>
      {/* Hamburger Menu for Small Screens */}
      <button
        className={`fixed top-3 left-2 ${
          isSidebarOpen ? "lg:top-24 left-48" : "lg:top-12 lg:left-3"
        }  left-3 z-20 p-2 text-gray-800`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <ArrowCircleLeft size={20} color="#20638b" weight="duotone" />
        ) : (
          <List size={20} color="#20638b" weight="duotone" />
        )}
      </button>

      <div
        className={`fixed top-0 left-0 h-full  bg-[rgba(255,255,255,0.1)]  backdrop-blur-md shadow-2xl border transition-all duration-300 z-10 ${
          isSidebarOpen ? "w-56" : "w-0 lg:w-16"
        } flex flex-col overflow-hidden`}
      >
        <div className="sidebar-scroll flex flex-col flex-grow  h-full overflow-y-auto">
          <div className="flex items-center p-2">
            <div
              className={`flex items-center ${
                !isSidebarOpen
                  ? "justify-center"
                  : "ml-6 lg:ml-0 md:ml-6 mt-1 lg:mt-0 md:mt-0"
              } text-sm lg:text-lg`}
            >
              <img
                className={`w-8 h-8 md:w-10 md:h-10 ${
                  isSidebarOpen ? "hidden" : ""
                }`}
                src={bird}
                alt="Logo"
              />
              <div className="">
                <img
                  src={easyCol}
                  className={`w-32 ml-6${!isSidebarOpen ? "hidden" : ""}`}
                />
              </div>
            </div>
          </div>

          <nav>
            <ul
              className={`mt-6 space-y-2 px-2 py-2 flex-grow text-[14px] font-bold font-suse`}
            >
              <div>
                {isSidebarOpen && (
                  <p className="px-2 text-[10px] font-[500px] uppercase">
                    Main
                  </p>
                )}
                <li className="py-1">
                  <Link
                    to="/"
                    className="flex items-center p-3 hover:text-sideCol hover:bg-gray-300 focus:bg-gray-300 focus:outline-none rounded-lg transition-all duration-300"
                  >
                    <HouseSimple size={20} color="#20638b" weight="duotone" />
                    <span
                      className={`ml-3 ${
                        !isSidebarOpen ? "hidden" : ""
                      } flex-1`}
                    >
                      Dashboard
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/patients"
                    className="flex items-center p-3 hover:text-sideCol   hover:bg-gray-300 focus:bg-gray-300 focus:outline-none rounded-lg transition-all duration-300"
                  >
                    {/* <FaUsers size={14} /> */}{" "}
                    <UsersThree size={20} color="#20638b" weight="duotone" />
                    <span className={`ml-3 ${!isSidebarOpen ? "hidden" : ""}`}>
                      Patients
                    </span>
                  </Link>
                </li>
                <li className="py-1">
                  <Link
                    to="/doctors"
                    className="flex items-center p-3 hover:text-sideCol hover:bg-gray-300 focus:bg-gray-300 focus:outline-none rounded-lg transition-all duration-300"
                  >
                    <Heartbeat size={20} color="#20638b" weight="duotone" />
                    <span className={`ml-3 ${!isSidebarOpen ? "hidden" : ""}`}>
                      Doctors
                    </span>
                  </Link>
                </li>

                <li className="py-1">
                  <Link
                    to="/appointments"
                    className="flex items-center p-3 hover:text-sideCol hover:bg-gray-300 focus:bg-gray-300 focus:outline-none rounded-lg transition-all duration-300"
                  >
                    <Calendar size={20} color="#20638b" weight="duotone" />
                    <span className={`ml-3 ${!isSidebarOpen ? "hidden" : ""}`}>
                      Appointments
                    </span>
                  </Link>
                </li>
              </div>
              <div>
                {isSidebarOpen && (
                  <p className="px-2 text-[10px] font-[500px] uppercase">
                    Payment
                  </p>
                )}

                <li className="py-1 ">
                  <div
                    className="flex items-center p-3 hover:text-sideCol hover:bg-gray-300 focus:bg-gray-300 focus:outline-none rounded-lg transition-all duration-300 cursor-pointer"
                    onClick={() => handleItemClick("payment")} // Toggles the "payment" dropdown
                  >
                    <Link to="/payments" className="flex items-center w-full">
                      <Coins size={20} color="#20638b" weight="duotone" />
                      <span
                        className={`ml-3 ${
                          !isSidebarOpen ? "hidden" : "flex-1"
                        }`}
                      >
                        Payment
                      </span>
                    </Link>
                    {/* Rotate CaretDown icon based on active state */}
                    <CaretDown
                      className={`transform transition-transform duration-300 ${
                        activeItem === "payment" ? "rotate-180" : "rotate-0"
                      } ${!isSidebarOpen ? "hidden" : ""}`}
                      size={18}
                      color="#20638b"
                      weight="bold"
                    />
                  </div>

                  {/* Dropdown section (Income & Analytics) */}
                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      activeItem === "payment" && isSidebarOpen
                        ? "max-h-40" // Expand the dropdown
                        : "max-h-0" // Collapse the dropdown
                    }`}
                  >
                    <ul className="pl-6 ml-4">
                      <li className="flex items-center p-3 hover:text-sideCol hover:bg-gray-300  rounded-lg transition-all duration-300">
                        Income
                      </li>
                      <li className="flex items-center p-3 hover:text-sideCol hover:bg-gray-300  rounded-lg transition-all duration-300">
                        Analytics
                      </li>
                    </ul>
                  </div>
                </li>
                {/* <li>
                  <Link
                    to="/payments"
                    className="flex items-center p-3 hover:text-sideCol hover:bg-purpleBg rounded-lg transition-all duration-300"
               
                  >
                    <Coins size={20} color="#20638b" weight="duotone" />
                    <span
                      className={`ml-3 ${!isSidebarOpen ? "hidden" : "flex-1"}`}
                    >
                      Payment
                    </span>
                    <CaretDown
                      className={`${!isSidebarOpen ? "hidden" : ""}`}
                      onClick={() => handleItemClick("payment")}
                      size={18}
                      color="#20638b"
                      weight="bold"
                    />
                  </Link>
                  {activeItem === "payment" && isSidebarOpen && (
                    <ul className="ml-3 pl-6 ml-4">
                      <li className="flex items-center p-3 hover:text-sideCol hover:bg-purpleBg rounded-lg transition-all duration-300">
                        Income
                      </li>
                      <li className="flex items-center p-3 hover:text-sideCol hover:bg-purpleBg rounded-lg transition-all duration-300">
                        Analytics
                      </li>
                    </ul>
                  )}
                </li> */}
                <li className="py-1">
                  <Link
                    to="/invoices"
                    className="flex items-center p-3 hover:text-sideCol hover:bg-gray-300 focus:bg-gray-300 focus:outline-none rounded-lg transition-all duration-300"
                  >
                    <Scroll size={20} color="#20638b" weight="duotone" />
                    <span className={`ml-3 ${!isSidebarOpen ? "hidden" : ""}`}>
                      Invoice
                    </span>
                  </Link>
                </li>
              </div>
              <div>
                {isSidebarOpen && (
                  <p className="px-2 text-[10px] font-[500px] uppercase">
                    Others
                  </p>
                )}
                <li className="py-1">
                  <Link
                    to="/error"
                    className="flex items-center p-3 hover:text-sideCol hover:bg-gray-300 focus:bg-gray-300 focus:outline-none rounded-lg transition-all duration-300"
                  >
                    <FirstAidKit size={20} color="#20638b" weight="duotone" />
                    <span className={`ml-3 ${!isSidebarOpen ? "hidden" : ""}`}>
                      Services
                    </span>
                  </Link>
                </li>
                <li className="py-1">
                  <Link
                    to="/error"
                    className="flex items-center p-3 hover:text-sideCol hover:bg-gray-300 focus:bg-gray-300 focus:outline-none rounded-lg transition-all duration-300"
                  >
                    <Storefront size={20} color="#20638b" weight="duotone" />
                    <span className={`ml-3 ${!isSidebarOpen ? "hidden" : ""}`}>
                      Medicine
                    </span>
                  </Link>
                </li>
                <li className="py-1">
                  <Link
                    to="/error"
                    className="flex items-center p-3 hover:text-sideCol hover:bg-gray-300 focus:bg-gray-300 focus:outline-none rounded-lg transition-all duration-300"
                  >
                    <Megaphone  size={20} color="#20638b" weight="duotone" />
                    <span className={`ml-3 ${!isSidebarOpen ? "hidden" : ""}`}>
                      Campaign
                    </span>
                  </Link>
                </li>
              </div>
              <div className="">
                {isSidebarOpen && (
                  <p className="px-2 text-[10px] font-[500px] uppercase">
                    Settings
                  </p>
                )}
                <li className="py-1">
                  <Link
                    to="/profile/settings"
                    className="flex items-center p-3 hover:text-sideCol hover:bg-gray-300 focus:bg-gray-300 focus:outline-none rounded-lg transition-all duration-300"
                  >
                    <GearSix size={20} color="#20638b" weight="duotone" />
                    <span className={`ml-3 ${!isSidebarOpen ? "hidden" : ""}`}>
                      Settings
                    </span>
                  </Link>
                </li>
              </div>
            </ul>
          </nav>
        </div>

        {/* Logout Button at the Bottom */}
        <div className="flex-shrink-0 p-4 space-y-2 px-2 py-4 text-[14px] font-bold font-suse">
          <Link
            to="/login"
            className="flex items-center p-3 hover:text-sideCol hover:bg-gray-300 focus:bg-gray-300 focus:outline-none rounded-lg transition-all duration-300"
          >
            <SignOut size={20} color="#20638b" weight="duotone" />
            <span className={`ml-3 ${!isSidebarOpen ? "hidden" : ""}`}>
              Logout
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
