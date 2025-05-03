import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Authapi } from "../api/Authapi";
import { MerchantAuthApi } from "../api/MerchantAuthApi";
import { MerchantImageApi } from "../api/MerchantImageApi";
import { ServiceProviderApi } from "../api/ServiceProviderApi";
import { GrocerySellerApi } from "../api/GrocerySellerApi";
import { StudentApi } from "../api/StudentApi"; // Add StudentApi import
import fetchuserReducer from "@/redux/api/FetchUsers";

const store = configureStore({
  reducer: {
    // RTK Query reducers
    [Authapi.reducerPath]: Authapi.reducer,
    [MerchantAuthApi.reducerPath]: MerchantAuthApi.reducer,
    [MerchantImageApi.reducerPath]: MerchantImageApi.reducer,
    [ServiceProviderApi.reducerPath]: ServiceProviderApi.reducer,
    [GrocerySellerApi.reducerPath]: GrocerySellerApi.reducer,
    [StudentApi.reducerPath]: StudentApi.reducer, // Add StudentApi reducer
    // Add the fetchuser slice reducer
    fetchuser: fetchuserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(Authapi.middleware)
      .concat(MerchantAuthApi.middleware)
      .concat(MerchantImageApi.middleware)
      .concat(ServiceProviderApi.middleware)
      .concat(GrocerySellerApi.middleware)
      .concat(StudentApi.middleware), // Add StudentApi middleware
});

// Enable refetching and other RTK Query features
setupListeners(store.dispatch);

export default store;