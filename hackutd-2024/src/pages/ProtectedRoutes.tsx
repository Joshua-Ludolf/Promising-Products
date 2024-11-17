import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Nav from "../components/Nav";

function ProtectedRoutes({ session, signOut }) {
  return session ?<><Nav signOut={signOut} /> <main className="mx-24"><Outlet /></main></> : <Navigate to="/" />;
}

export default ProtectedRoutes;
