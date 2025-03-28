import { configureStore } from "@reduxjs/toolkit";
import { Authapi } from "../api/Authapi";
import { StudentApi } from "../api/Studentapi";

const store = configureStore({
  reducer: {
    [Authapi.reducerPath]: Authapi.reducer,
    [StudentApi.reducerPath]: StudentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Authapi.middleware, StudentApi.middleware), 
});

export default store;
