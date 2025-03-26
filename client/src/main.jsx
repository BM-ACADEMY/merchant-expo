import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SidebarProvider } from "./modules/admin/context/SidebarContext";
import { Provider } from "react-redux";



import store from "./redux/store/store";

import store from "@/redux/store/store";

import { GoogleOAuthProvider } from "@react-oauth/google";


createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="82108271148-mf16gsn60dnpp156vgvfra9f2bin44np.apps.googleusercontent.com">
    <Provider store={store}>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </Provider>
  </GoogleOAuthProvider>
);
