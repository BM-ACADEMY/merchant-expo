import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import SubAdminLayout from "./SubAdminLayout";

const SubAdminRoute = (
    <Route path="/subAdmin" element={<SubAdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
  );


export default SubAdminRoute;
