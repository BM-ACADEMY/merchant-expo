import { Route } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./HomePage";
import SellerFAQ from "../../staticPages/SellerFAQ";
import BuyerFAQ from "../../staticPages/BuyerFAQ";
import AllCountriesPage from "./pages/pages/categorySection/AllCountriesPage";
import AllCategoriesPage from "./pages/pages/categorySection/AllCategoriesPage";
import SubCategoryList from "./pages/pages/categorySection/SubCategoryList";
import ProductList from "./pages/pages/categorySection/ProductList";
import SubCategoryDetail from "./pages/pages/categorySection/SubCategoryDetailsPage";
import ProductListPage from "./pages/pages/categorySection/ProductsPages/ProductListPage";
import ProductDetailsPage from "./pages/pages/categorySection/ProductsPages/ProductDetailsPage";

const HomePageRoute = (
  <Route path="/*" element={<HomeLayout />}>
    <Route index element={<HomePage />} />
    <Route path="home" element={<HomePage />} />
    <Route path="seller-faq" element={<SellerFAQ />} />
    <Route path="buyer-faq" element={<BuyerFAQ />} />

    {/* Login & Register nested inside HomeLayout but accessible via "/login" */}
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="all-country" element={<AllCountriesPage />} />
    <Route path="all-categories" element={<AllCategoriesPage />} />
    <Route path="all-categories/:category" element={<SubCategoryList />} />
    <Route path="all-categories/:category/:subCategory" element={<SubCategoryList />} />
    <Route path="subcategory-detail/:subcategoryName" element={<SubCategoryDetail />} />
    <Route path="products/:type/:deepSubCategory" element={<ProductListPage />} />
    <Route path="product/:product_name" element={<ProductDetailsPage />} />

  </Route>
);

export default HomePageRoute;

