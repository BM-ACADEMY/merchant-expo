
import './App.css'
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './AppRoute'
import { ActiveUserProvider } from './modules/admin/context/ActiveUserProvider';
import { AuthProvider } from './modules/landing/context/AuthContext';
function App() {


  return (
    <Router>
      <AuthProvider>
      <ActiveUserProvider>
      <AppRoutes />
      </ActiveUserProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
