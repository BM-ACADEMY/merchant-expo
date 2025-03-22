import React, { useState } from "react";
import { useSidebar } from "../../hooks/useSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch } from "react-redux";
// import { setUsers } from "../../redux/slice/UserSlice";

const Users = () => {
  const { isSidebarOpen } = useSidebar();
  const dispatch=useDispatch();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", userData);
    // dispatch(setUsers(userData));
  };

  return (
    <div className={`${isSidebarOpen ? "p-6 lg:ml-56" : "p-4 lg:ml-16"}`}>

    </div>
  );
};

export default Users;
