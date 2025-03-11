import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Dashboard from "./admin/pages/dashboard/dashboard";
import Header from "./admin/layout/Header";
import Sidebar from "./admin/layout/Sidebar";
import Users from "./admin/pages/users/Users";
import Merchant from "./admin/pages/merchants/Merchant";
import Serviceprovider from "./admin/pages/service-provider/Service-provider";
import Student from "./admin/pages/student/Student";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/merchant" element={<Merchant/>} />
          <Route path="/service-provider" element={<Serviceprovider/>} />
          <Route path="/student" element={<Student/>} />
         
        </Routes>
      </Router>

   
    </div>
  );
}

export default App;
