import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SidebarProvider } from "./modules/admin/context/SidebarContext";
import { Provider } from "react-redux";
import store from "./modules/admin/redux/store/Store";

createRoot(document.getElementById("root")).render(
 
    <Provider store={store}>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </Provider>

);
