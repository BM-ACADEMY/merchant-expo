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
      <Card className="max-w-md mx-auto shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">User Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={userData.username}
              onChange={handleChange}
              className="w-full"
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
              className="w-full"
              required
            />
            <Input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={userData.phoneNumber}
              onChange={handleChange}
              className="w-full"
              required
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
