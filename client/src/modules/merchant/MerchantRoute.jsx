import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import MerchantLayout from './MerchantLayout';


const MerchantRoute = (
 
    <Route path="/merchant" element={<MerchantLayout />}>  
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
  </Route>
  )


export default MerchantRoute;
