import { Routes, Route,Navigate } from "react-router-dom";
import AdminRoutes from "./modules/admin/AdminRoutes";
import SellerFAQ from "./staticPages/SellerFAQ";
import BuyerFAQ from "./staticPages/BuyerFAQ";
// import MerchantRoutes from "../modules/merchant/MerchantRoutes";
// import ServiceProviderRoutes from "../modules/service-provider/ServiceProviderRoutes";
// import StudentRoutes from "../modules/student/StudentRoutes";
// import GrocerySellerRoutes from "../modules/grocery-seller/GrocerySellerRoutes";
// import CommonUserRoutes from "../modules/common-user/CommonUserRoutes";

const AppRoutes = () => {
  return (
    <Routes>
       <Route path="/" element={<Navigate to="/admin/dashboard" />} />
       <Route path="/seller-faq" element={<SellerFAQ />} />
       <Route path="/buyer-faq" element={<BuyerFAQ />} />
      {AdminRoutes}
      {/* {MerchantRoutes}
      {ServiceProviderRoutes}
      {StudentRoutes}
      {GrocerySellerRoutes}
      {CommonUserRoutes} */}
    </Routes>
  );
};

export default AppRoutes;
