import { Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Dashboard from "./pages/dashboard/dashboard";
import Profile from "./pages/profile/Profile";
import Users from "./pages/users/Users";
import MerchantList from "./pages/merchants/MerchantList";
import MerchantProducts from "./pages/merchants/MerchantProducts";
import ServiceProviderList from "./pages/service-provider/ServiceProviderList";
import Vehicles from "./pages/service-provider/ServiceProviderVehicle";
import StudentList from "./pages/student/StudentList";
import PaidSubcriptions from "./pages/payments/PaidSubcriptionsList";
import PaidBanner from "./pages/payments/PaidBanner";
import PaidRedeem from "./pages/payments/PaidRedeemCoupons";
import PaidEbook from "./pages/payments/PaidEbooks";
import PlansBanner from "./pages/plans/Banners";
import PlansEbook from "./pages/plans/EBook";
import PlanSubcriptions from "./pages/plans/Subcriptions";
import MainCategories from "./pages/categories/MainCategory";
import SubCategories from "./pages/categories/SubCategory";
import SuperSubCategories from "./pages/categories/SuperSubCategory";
import DeepSubCategories from "./pages/categories/DeepSubCategory";
import Products from "./pages/categories/Products";
import GrocerySellerList from "./pages/grocery/GrocerySellerList";
import PostRequirement from "./pages/others/PostRequirement";
import FAQ from "./pages/others/FAQ";
import Complaint from "./pages/others/Complaint";
import Testimonial from "./pages/others/Testimonial";

const AdminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="profile" element={<Profile />} />
    <Route path="common-users" element={<Users />} />
    
    {/* Merchant Routes */}
    <Route path="merchants" element={<MerchantList />} />
    <Route path="merchants/products" element={<MerchantProducts />} />
    
    {/* Service Provider Routes */}
    <Route path="service-providers" element={<ServiceProviderList />} />
    <Route path="service-providers/vehicles" element={<Vehicles />} />
    
    {/* Student Routes */}
    <Route path="students" element={<StudentList />} />
    
    {/* Payment Routes */}
    <Route path="payments/subscriptions" element={<PaidSubcriptions />} />
    <Route path="payments/ebooks" element={<PaidEbook />} />
    <Route path="payments/banners" element={<PaidBanner />} />
    <Route path="payments/coupons" element={<PaidRedeem />} />
    
    {/* Plans Routes */}
    <Route path="plans/subscriptions" element={<PlanSubcriptions />} />
    <Route path="plans/banners" element={<PlansBanner />} />
    <Route path="plans/ebooks" element={<PlansEbook />} />
    
    {/* Category Routes */}
    <Route path="categories/main" element={<MainCategories />} />
    <Route path="categories/sub" element={<SubCategories />} />
    <Route path="categories/super-sub" element={<SuperSubCategories />} />
    <Route path="categories/deep-sub" element={<DeepSubCategories />} />
    <Route path="categories/products" element={<Products />} />
    
    {/* grocery seller*/ }
    <Route path="grocery-sellers" element={<GrocerySellerList />} />
    {/* Other Routes */}
    <Route path="others/post-requirement" element={<PostRequirement />} />
    <Route path="others/faq" element={<FAQ />} />
    <Route path="others/complaint" element={<Complaint />} />
    <Route path="others/testimonial" element={<Testimonial />} />
  </Route>
);

export default AdminRoutes;
