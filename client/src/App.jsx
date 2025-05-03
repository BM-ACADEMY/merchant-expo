
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoute";
import { ActiveUserProvider } from "./modules/admin/context/ActiveUserProvider";
import { AuthProvider } from "./modules/landing/context/AuthContext";
import { MerchantProvider } from "./modules/admin/context/MerchantContext";
import { ToastContainer } from "react-toastify";
import { NotificationProvider } from "./modules/admin/context/NotificationContext";
import "react-toastify/dist/ReactToastify.css";
import { SocketProvider } from "./modules/admin/context/SocketContext";
import { SelectedUserProvider } from "./modules/admin/context/SelectedUserContext";
import { ActiveUserProvider } from './modules/admin/context/ActiveUserProvider';
import { AuthProvider } from './modules/landing/context/AuthContext';
function App() {

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AuthProvider>
        <SelectedUserProvider>
        <SocketProvider >
        <NotificationProvider>
          <MerchantProvider>

            <ActiveUserProvider>
              <AppRoutes />
            </ActiveUserProvider>

          </MerchantProvider>
        </NotificationProvider>
        </SocketProvider>
        </SelectedUserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
