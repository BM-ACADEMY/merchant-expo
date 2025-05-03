import { Route } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./HomePage";
import SellerFAQ from "../../staticPages/SellerFAQ";
import BuyerFAQ from "../../staticPages/BuyerFAQ";

const HomePageRoute = (
  <Route path="/*" element={<HomeLayout />}>  
    <Route index element={<HomePage />} />
    <Route path="home" element={<HomePage />} />
    <Route path="seller-faq" element={<SellerFAQ />} />
    <Route path="buyer-faq" element={<BuyerFAQ />} />

    {/* Login & Register nested inside HomeLayout but accessible via "/login" */}
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </Route>
);

export default HomePageRoute;

