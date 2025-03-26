// import { Routes, Route, Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "@/modules/landing/context/AuthContext";
// import AuthRoute from "@/guard/AuthRoute"; // Import the AuthRoute component
// import AdminRoutes from "./modules/admin/AdminRoutes";
// // import MerchantRoutes from "./modules/merchant/MerchantRoutes";
// // import ServiceProviderRoutes from "./modules/service-provider/ServiceProviderRoutes";
// // import StudentRoutes from "./modules/student/StudentRoutes";
// // import GrocerySellerRoutes from "./modules/grocery-seller/GrocerySellerRoutes";
// // import CommonUserRoutes from "./modules/common-user/CommonUserRoutes";
// import HomePageRoute from "./modules/landing/HomePageRoute";

// const AppRoutes = () => {
//   const { user } = useContext(AuthContext);

//   return (
//     <Routes>
//       {/* Public Routes */}
//       {HomePageRoute}

//       {/* Protected Routes with Role-Based Access */}
//       <Route element={<AuthRoute allowedRoles={["ADMIN"]} />}>
//         {AdminRoutes}
//       </Route>
//       {/* <Route element={<AuthRoute allowedRoles={["MERCHANT"]} />}>
//         {MerchantRoutes}
//       </Route>
//       <Route element={<AuthRoute allowedRoles={["SERVICE_PROVIDER"]} />}>
//         {ServiceProviderRoutes}
//       </Route>
//       <Route element={<AuthRoute allowedRoles={["STUDENT"]} />}>
//         {StudentRoutes}
//       </Route>
//       <Route element={<AuthRoute allowedRoles={["GROCERY_SELLER"]} />}>
//         {GrocerySellerRoutes}
//       </Route>
//       <Route element={<AuthRoute allowedRoles={["USER"]} />}>
//         {CommonUserRoutes}
//       </Route> */}

//       {/* Redirect unauthorized users */}
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// };

// export default AppRoutes;
import { Routes, Route, Navigate } from "react-router-dom";
import HomePageRoute from "./modules/landing/HomePageRoute";
import AdminRoutes from "./modules/admin/AdminRoutes";
import MerchantRoutes from "./modules/merchant/MerchantRoute";
import UserRoutes from "./modules/commonUser/CommonUserRoute";
import Unauthorized from "./staticPages/Unauthorized";
import PrivateRoute from "@/guard/PrivateRoute";
import SubAdminRoute from "./modules/subAdmin/SubAdminRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes (Home, Login, Register) */}
      {HomePageRoute}

      {/* Private Routes for Logged-in Users */}
      <Route element={<PrivateRoute allowedRoles={["ADMIN", "SUB_ADMIN", "MERCHANT", "USER","SERVICE_PROVIDER","GROCERY_SELLER","STUDENT"]} />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Route>

      {/* Role-Specific Routes */}
      {AdminRoutes}
      {MerchantRoutes}
      {UserRoutes}
      {SubAdminRoute}
      {/* Unauthorized Route */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Catch-all Route */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRoutes;
