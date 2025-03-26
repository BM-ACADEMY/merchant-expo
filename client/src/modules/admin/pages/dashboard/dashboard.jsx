import { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/slice/UserSlice";
import { useSidebar } from "../../hooks/useSidebar";
import { ActiveUserContext } from "../../context/ActiveUserProvider";

import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";


const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const { isSidebarOpen } = useSidebar();
  const { points } = useContext(ActiveUserContext);


  return (
    <div className={`${isSidebarOpen ? "p-6 lg:ml-56" : "p-4 lg:ml-16"}`}>
      <h1>Welcome to Dashboard, Points: {points}</h1>
      </div>

  );
};

export default Dashboard;
