import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes({ session }) {
  return session ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
