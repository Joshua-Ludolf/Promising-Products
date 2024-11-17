import "./index.css";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import supabase from "../supabase";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoutes from "./pages/ProtectedRoutes";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Fetch the current session from Supabase and set it in state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      session;
    });
  }, [session]);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    console.log("sign out");
    setSession(null);
    return <Navigate to="/" />;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login session={session} setSession={setSession} />}
          />
          <Route element={<ProtectedRoutes session={session} signOut={signOut} />}>
              <Route path="/home" element={<Home />}>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
