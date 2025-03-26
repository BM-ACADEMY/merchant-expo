import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import StudentLayout from './StudentLayout';


const ServiceProviderRoute = (
  
    <Route path="/student" element={<StudentLayout />}>  
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
  </Route>
  )


export default ServiceProviderRoute;
