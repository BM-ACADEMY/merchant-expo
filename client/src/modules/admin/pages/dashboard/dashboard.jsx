import { useEffect, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useSidebar } from "../../hooks/useSidebar";
import { ActiveUserContext } from "../../context/ActiveUserProvider";

import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

// Import missing components
import Help from "@/staticPages/help";
import FeedBack from "@/staticPages/FeedBack";
import Testimonial from "@/staticPages/Testimonial";
import PostRequirement from "@/staticPages/PostByRequirement";
import Complaint from "@/staticPages/Complaint";
import AboutUs from "@/staticPages/AboutUs";
import Disclaimer from "@/staticPages/Disclaimer";
import ContactUs from "@/staticPages/ContactUs";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSidebar();
  const { points } = useContext(ActiveUserContext);

  const [profile, setProfile] = useState(null);

  // Google Login function
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        setProfile(res.data);
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    onError: (error) => console.error("Login Error:", error),
  });

  // Logout function
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  useEffect(() => {}, [dispatch]);

  return (
    <div className={`${isSidebarOpen ? "p-6 lg:ml-56" : "p-4 lg:ml-16"}`}>
      <h1>Welcome to Dashboard, Points: {points}</h1>

      <Help />
      <div className="mt-10">
        <FeedBack />
      </div>
      <div className="mt-10">
        <Testimonial />
      </div>
      <div className="mt-10">
        <PostRequirement />
      </div>

      <div className="mt-10">
        {profile ? (
          <div>
            <img src={profile.picture} alt="User Profile" />
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <button onClick={logOut}>Log out</button>
          </div>
        ) : (
          <button onClick={login}>Sign in with Google 🚀</button>
        )}
      </div>

      <Complaint />
      <div className="mt-10">
        <AboutUs />
      </div>
      <div className="mt-10">
        <Disclaimer />
      </div>
      <div className="mt-10">
        <ContactUs />
      </div>
    </div>
  );
};

export default Dashboard;
