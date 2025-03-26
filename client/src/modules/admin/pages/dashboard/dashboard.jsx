import { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSidebar } from "../../hooks/useSidebar";
import { ActiveUserContext } from "../../context/ActiveUserProvider";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";



const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const { isSidebarOpen } = useSidebar();
  const { points } = useContext(ActiveUserContext);

  const [accessToken, setAccessToken] = useState(null); // Store token separately
  const [profile, setProfile] = useState(null); // Store user profile

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log("Login Success:", codeResponse);

      const token = codeResponse.access_token;
      setAccessToken(token); // Store access token

      try {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`
        );
        const decodedData = await response.json();

        console.log("Decoded Token:", decodedData);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (accessToken) {
      axios
        .get("https://www.googleapis.com/oauth2/v1/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          console.log("User Profile:", res.data);
          setProfile(res.data);
        })
        .catch((err) => {
          console.error("Error fetching user info:", err);
        });
    }
  }, [accessToken]);

  // Logout function
  const logOut = () => {
    googleLogout();
    setProfile(null);
    setAccessToken(null);
  };

  return (
    <div className={`${isSidebarOpen ? "p-6 lg:ml-56" : "p-4 lg:ml-16"}`}>
      <h1>Welcome to Dashboard, Points: {points}</h1>
      <div>
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
          <button onClick={() => login()}>Sign in with Google 🚀</button>
        )}

        {/* <AboutUs /> */}
        <Complaint />
        <div className="mt-10">
          <AboutUs/>
        </div>
        <div className="mt-10">
          <Disclaimer/>
        </div>
        <div className="mt-10">
          <ContactUs/>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
