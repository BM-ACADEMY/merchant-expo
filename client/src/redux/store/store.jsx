import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Authapi } from "../api/Authapi"; // Your existing auth API
import { MerchantAuthApi } from "../api/MerchantAuthApi"; // Existing merchant auth API
import { MerchantImageApi } from "../api/MerchantImageApi"; // New merchant image API
import { ServiceProviderApi } from "../api/ServiceProviderApi"; // Newly added service provider API
import { GrocerySellerApi } from "../api/GrocerySellerApi"; // Newly added grocery seller API
import fetchuserReducer from "@/redux/api/FetchUsers"; // Import the fetchuser slice reducer

const store = configureStore({
  reducer: {
    // RTK Query reducers
    [Authapi.reducerPath]: Authapi.reducer,
    [MerchantAuthApi.reducerPath]: MerchantAuthApi.reducer,
    [MerchantImageApi.reducerPath]: MerchantImageApi.reducer,
    [ServiceProviderApi.reducerPath]: ServiceProviderApi.reducer,
    [GrocerySellerApi.reducerPath]: GrocerySellerApi.reducer, // Added GrocerySellerApi reducer
    // Add the fetchuser slice reducer
    fetchuser: fetchuserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(Authapi.middleware)
      .concat(MerchantAuthApi.middleware)
      .concat(MerchantImageApi.middleware)
      .concat(ServiceProviderApi.middleware)
      .concat(GrocerySellerApi.middleware), // Added GrocerySellerApi middleware
});

// Enable refetching and other RTK Query features
setupListeners(store.dispatch);

export default store;



