import { configureStore } from "@reduxjs/toolkit";
import { Authapi } from "../api/Authapi"; // Corrected import

 const store = configureStore({
  reducer: {
    [Authapi.reducerPath]: Authapi.reducer, // Corrected reference
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Authapi.middleware), // Corrected reference
});
export default store;