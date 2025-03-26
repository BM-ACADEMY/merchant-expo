import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import ServiceProviderLayout from './ServiceProviderLayout';



const ServiceProviderRoute = (
  
    <Route path="/serviceProvider" element={<ServiceProviderLayout />}>  
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
  </Route>
  )


export default ServiceProviderRoute;
