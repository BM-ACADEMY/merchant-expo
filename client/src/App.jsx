
import './App.css'
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './AppRoute'
import { ActiveUserProvider } from './modules/admin/context/ActiveUserProvider';
function App() {


  return (
    <Router>
      <ActiveUserProvider>
      <AppRoutes />
      </ActiveUserProvider>

    </Router>
  )
}

export default App
