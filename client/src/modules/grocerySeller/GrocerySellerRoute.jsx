import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import GrocerySellerLayout from './GrocerySellerLayout';

const GrocerySellerRoute = (

    <Route path="/grocerySeller" element={<GrocerySellerLayout />}>  
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
  </Route>
  )


export default GrocerySellerRoute;
