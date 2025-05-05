
import { configureStore } from "@reduxjs/toolkit";

import { Authapi } from "../api/Authapi";
import { StudentApi } from "../api/Studentapi";
import { MerchantProductApi } from "../api/MerchantProductApi";
import { MerchantProductImageApi } from "../api/MerchantProductImageApi";
import { CategoryApi } from "../api/CategoryApi";
import { CategoryImageApi } from "../api/CategoryImageApi";
import { SubCategoryApi } from "../api/SubCategoryApi";
import { SubCategoryImageApi } from "../api/SubCategoryImageApi";
import { SuperSubCategoryApi } from "../api/SuperSubCategoryApi";
import { DeepSubCategoryApi } from "../api/DeepSubCategoryApi";
import { DeepSubCategoryImageApi } from "../api/DeepSubCategoryImageApi";
import { ProductApi } from "../api/ProductApi";
import { ProductImageApi } from "../api/ProductImageApi";
import { SubscriptionPlansApi } from "../api/SubcriptionPlanApi";
import { SubscriptionPlanElementsApi } from "../api/SubscriptionPlanElementApi";
import {SubscriptionPlanElementMappingApi} from "../api/SubscriptionPlanElementMappingApi"
import { PostByRequirementApi } from "../api/PostByRequirementApi";
import { ComplaintFormApi } from "../api/ComplaintFormApi";
import { ComplaintFormImageApi } from "../api/ComplaintFormImageApi";
import { FaqApi } from "../api/FAQapi";
import { TestimonialApi } from "../api/Testimonialapi";
import { UserProfilePicApi } from "../api/UserprofilePicapi";
import { PointsApi } from "../api/PointApi";
import { CouponApi } from "../api/CouponApi";
import { PermissionApi } from "../api/PermissionApi";
import { PermissionRequestApi } from "../api/PermissionRequestApi";
import { MessageApi } from "../api/MessageApi";
import { MessageImagesApi } from "../api/MessageImagesApi";
import { MerchantAuthApi } from "../api/MerchantAuthApi";
import { MerchantImageApi } from "../api/MerchantImageApi";
import { ServiceProviderApi } from "../api/ServiceProviderApi";
import { GrocerySellerApi } from "../api/GrocerySellerApi";
import fetchuserReducer from "@/redux/api/FetchUsers";

const store = configureStore({
  reducer: {
    [Authapi.reducerPath]: Authapi.reducer,
    [StudentApi.reducerPath]: StudentApi.reducer,
    [MerchantProductApi.reducerPath]: MerchantProductApi.reducer,
    [MerchantProductImageApi.reducerPath]:MerchantProductImageApi.reducer,
    [CategoryApi.reducerPath]: CategoryApi.reducer,
    [CategoryImageApi.reducerPath]: CategoryImageApi.reducer,
    [SubCategoryApi.reducerPath]: SubCategoryApi.reducer,
    [SubCategoryImageApi.reducerPath]: SubCategoryImageApi.reducer,
    [SuperSubCategoryApi.reducerPath]: SuperSubCategoryApi.reducer,
    [DeepSubCategoryApi.reducerPath]: DeepSubCategoryApi.reducer,
    [DeepSubCategoryImageApi.reducerPath]: DeepSubCategoryImageApi.reducer,
    [ProductApi.reducerPath]:ProductApi.reducer,
    [ProductImageApi.reducerPath]:ProductImageApi.reducer,
    [SubscriptionPlansApi.reducerPath]:SubscriptionPlansApi.reducer,
    [SubscriptionPlanElementsApi.reducerPath]:SubscriptionPlanElementsApi.reducer,
    [SubscriptionPlanElementMappingApi.reducerPath]:SubscriptionPlanElementMappingApi.reducer,
    [PostByRequirementApi.reducerPath]:PostByRequirementApi.reducer,
    [ComplaintFormApi.reducerPath]:ComplaintFormApi.reducer,
    [ComplaintFormImageApi.reducerPath]:ComplaintFormImageApi.reducer,
    [FaqApi.reducerPath]:FaqApi.reducer,
    [TestimonialApi.reducerPath]:TestimonialApi.reducer,
    [UserProfilePicApi.reducerPath]:UserProfilePicApi.reducer,
    [PointsApi.reducerPath]:PointsApi.reducer,
    [CouponApi.reducerPath]:CouponApi.reducer,
    [PermissionApi.reducerPath]:PermissionApi.reducer,
    [PermissionRequestApi.reducerPath]:PermissionRequestApi.reducer,
    [MessageApi.reducerPath]:MessageApi.reducer,
    [MessageImagesApi.reducerPath]:MessageImagesApi.reducer, [MerchantAuthApi.reducerPath]: MerchantAuthApi.reducer,
    [MerchantImageApi.reducerPath]: MerchantImageApi.reducer,
    [ServiceProviderApi.reducerPath]: ServiceProviderApi.reducer,
    [GrocerySellerApi.reducerPath]: GrocerySellerApi.reducer,
   
    fetchuser: fetchuserReducer,
    [MerchantAuthApi.reducerPath]:MerchantAuthApi.reducer,
    [MerchantImageApi.reducerPath]:MerchantImageApi.reducer,
    [ServiceProviderApi.reducerPath]:ServiceProviderApi.reducer,
    [GrocerySellerApi.reducerPath]:GrocerySellerApi.reducer,
  

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      Authapi.middleware,
      StudentApi.middleware,
      MerchantProductApi.middleware,
      MerchantProductImageApi.middleware,
      CategoryApi.middleware,
      CategoryImageApi.middleware,
      SubCategoryApi.middleware,
      SubCategoryImageApi.middleware,
      SuperSubCategoryApi.middleware,
      DeepSubCategoryApi.middleware,
      DeepSubCategoryImageApi.middleware,
      ProductApi.middleware,
      ProductImageApi.middleware,
      SubscriptionPlansApi.middleware,
      SubscriptionPlanElementsApi.middleware,
      SubscriptionPlanElementMappingApi.middleware,
      PostByRequirementApi.middleware,
      ComplaintFormApi.middleware,
      ComplaintFormImageApi.middleware,
      FaqApi.middleware,
      TestimonialApi.middleware,
      UserProfilePicApi.middleware,
      PointsApi.middleware,
      CouponApi.middleware,
      PermissionApi.middleware,
      PermissionRequestApi.middleware,
      MessageApi.middleware,
      MessageImagesApi.middleware,
      ServiceProviderApi.middleware
    ),
});

export default store;

