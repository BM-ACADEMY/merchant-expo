import React from 'react';
import { Route } from 'react-router-dom';
import CommonUserLayout from './CommonUserLayout';
import Dashboard from './pages/dashboard/Dashboard';

const CommonUserRoute = (
 
    <Route path="/user" element={<CommonUserLayout />}>  
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
  </Route>
  )


export default CommonUserRoute;
