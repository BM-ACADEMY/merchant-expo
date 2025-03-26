import { useState, useContext, useRef ,useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {useLoginWithEmailMutation,useLazyGetUserByIdQuery  } from "@/redux/api/Authapi";
import { useToast } from "@/modules/landing/hooks/useToast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login,user ,loginWithOtp } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("email");
 const { ToastComponent, showToast } = useToast();
  const [form, setForm] = useState({
    email: "",
    password: "",
    mobile: "",
    otp: ["", "", "", ""],
  });
  const [errors, setErrors] = useState({});
  const [isOtpShow, setIsOtpShow] = useState(false);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];
  const [loginWithEmail, { isLoading, error }] = useLoginWithEmailMutation();
  const [fetchUserById] = useLazyGetUserByIdQuery();
  // Validate Email Login



  // useEffect(() => {
  //   if (user) {
  //     navigate(roleBasedRoutes[user.role] || "/");
  //   }
  // }, [user, navigate]);

  const validateEmailLogin = () => {
    let newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Mobile Number
  const isValidMobile = (number) => /^[6-9]\d{9}$/.test(number);

  // Handle Login Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (loginType === "email") {
      if (validateEmailLogin()) {
        try {
          // Call login API
          const response = await loginWithEmail({
            email: form.email,
            password: form.password,
          }).unwrap();
  
          if (!response.success) {
            throw new Error(response.message || "Login Failed");
          }
  
          const token = response.data;
          localStorage.setItem("token", token);
  
          // Decode JWT to get user ID
          const decodedToken = jwtDecode(token);
          const userId = decodedToken?.userId;
  
          if (userId) {
            // Fetch user details after login
            const { data: userResponse } = await fetchUserById(userId);
            login(userResponse, token);
        
  
          } else {
            login(null, token);
          }

          showToast(response.message || "Login Successful", "success");
          navigate("/");
        } catch (err) {
          console.error("Login Error:", err);
          showToast(err?.message || "Login Failed", "error");
        }
      }
    }
  };
  
  // Handle OTP Input Change
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Only allow numbers
    let newOtp = [...form.otp];
    newOtp[index] = value;
    setForm({ ...form, otp: newOtp });

    // Move focus forward
    if (value && index < 3) otpRefs[index + 1].current.focus();
  };

  // Handle OTP Send/Resend
  const handleSendOtp = () => {
    setIsOtpShow(true); // Show OTP fields & hide mobile input
    setForm({ ...form, otp: ["", "", "", ""] }); // Clear OTP input
  };

  // Handle OTP Backspace (Move focus back)
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !form.otp[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };




  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
         {
           ToastComponent && (
            <div>
              {ToastComponent}
            </div>
           )
      }
      <div className="grid grid-cols-2 w-full max-w-4xl shadow-lg bg-white rounded-lg overflow-hidden">
        {/* Left - Login Form */}
        <div className="flex flex-col justify-center items-center p-8">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Merchant Expo Login
          </h2>

          {/* Toggle Login Type */}
          <div className="flex gap-4 mt-4">
            <Button
              onClick={() => {
                setLoginType("email");
                setIsOtpShow(false);
              }}
              className={`py-2 px-4 ${
                loginType === "email" ? "bg-[#e03733] text-white" : "bg-gray-300 cursor-pointer"
              }`}
            >
              Email Login
            </Button>
            <Button
              onClick={() => {
                setLoginType("otp");
                setIsOtpShow(false);
              }}
              className={`py-2 px-4 ${
                loginType === "otp" ? "bg-[#e03733] text-white" : "bg-gray-300 cursor-pointer"
              }`}
            >
              OTP Login
            </Button>
          </div>

          {/* Email/Password Login */}
          {loginType === "email" && (
            <form
              onSubmit={handleSubmit}
              className="mt-4 space-y-4 w-full max-w-sm"
            >
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}

              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-[#e03733] text-white py-2 rounded-md cursor-pointer"
              >
                Sign In
              </Button>
            </form>
          )}

          {/* Mobile OTP Login */}
          {loginType === "otp" && (
            <div className="mt-4 space-y-4 w-full max-w-sm">
              {/* Mobile Number Input - Hide if OTP is sent */}
              {!isOtpShow && (
                <>
                  <Input
                    type="text"
                    name="mobile"
                    placeholder="Enter Mobile Number"
                    value={form.mobile}
                    onChange={(e) =>
                      setForm({ ...form, mobile: e.target.value })
                    }
                    maxLength={10}
                  />
                  {isValidMobile(form.mobile) && (
                    <Button
                      onClick={handleSendOtp}
                      className="w-full bg-[#e03733] text-white py-2 rounded-md cursor-pointer"
                    >
                      Send OTP
                    </Button>
                  )}
                </>
              )}

              {/* OTP Input Boxes & Resend OTP Button */}
              {isOtpShow && (
                <>
                  <div className="flex gap-2 justify-center">
                    {form.otp.map((digit, index) => (
                      <Input
                        key={index}
                        ref={otpRefs[index]}
                        type="text"
                        maxLength={1}
                        className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>

                  {/* Resend OTP Button */}
                  <Button
                    onClick={handleSendOtp} // Resend OTP
                    className="w-full bg-gray-500 text-white py-2 rounded-md mt-3  cursor-pointer"
                  >
                    Resend OTP
                  </Button>

                  {/* Verify OTP Button */}
                  {form.otp.every((digit) => digit !== "") && (
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      className="w-full bg-[#e03733] text-white py-2 rounded-md cursor-pointer"
                    >
                      Verify OTP
                    </Button>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Right - Description Section */}
        <div className="flex flex-col justify-center items-center bg-[#e03733] text-white p-8">
          <h2 className="text-2xl font-semibold">Welcome to ExpoB2B</h2>
          <p className="text-center mt-3">
            Join our platform to expand your business, connect with merchants,
            and grow your network. Sign in to access exclusive deals and
            partnerships.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;

// import { useEffect, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const sections = [
//   { id: 1, color: "bg-green-500" },
//   { id: 2, color: "bg-red-500" },
//   { id: 3, color: "bg-orange-500" },
//   { id: 4, color: "bg-blue-500" },
//   { id: 5, color: "bg-purple-500" },
// ];

// export default function Login() {
//   const [activeSection, setActiveSection] = useState(1);

//   useEffect(() => {
//     // Smooth Scroll Effect
//     let scrollTween = gsap.to(".sections-container", {
//       yPercent: -100 * (sections.length - 1),
//       ease: "none",
//       scrollTrigger: {
//         trigger: ".sections-container",
//         start: "top top",
//         end: "+=" + window.innerHeight * (sections.length - 1),
//         pin: true,
//         scrub: 1,
//         snap: 1 / (sections.length - 1),
//       },
//     });

//     // Scale Animation & Active Section Tracking
//     const panels = gsap.utils.toArray(".section");

//     panels.forEach((panel, index) => {
//       gsap.fromTo(
//         panel,
//         { scale: 0.8, opacity: 0.5 },
//         {
//           scale: 1,
//           opacity: 1,
//           scrollTrigger: {
//             trigger: panel,
//             start: "top center",
//             end: "top center",
//             scrub: true,
//             onEnter: () => setActiveSection(index + 1),
//             onEnterBack: () => setActiveSection(index + 1),
//           },
//         }
//       );
//     });

//     return () => {
//       scrollTween.kill();
//       ScrollTrigger.getAll().forEach((st) => st.kill());
//     };
//   }, []);

//   return (
//     <div className="w-full h-screen overflow-hidden relative">
//       {/* Active Section Indicator */}
//       <div className="fixed top-5 left-5 z-50 p-4 bg-gray-900 text-white rounded-lg">
//         <p>Active Section: {activeSection}</p>
//       </div>

//       <div className="sections-container relative w-full h-screen">
//         {sections.map(({ id, color }) => (
//           <section
//             key={id}
//             className={`section flex justify-center items-center h-screen w-full transition-transform duration-500 ${color}`}
//           >
//             <h1 className="text-white text-4xl font-bold">Section {id}</h1>
//           </section>
//         ))}
//       </div>
//     </div>
//   );
// }


