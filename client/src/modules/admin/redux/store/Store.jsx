import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/UserSlice";


const store=configureStore({
   reducer:{
    userDetails:userReducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;