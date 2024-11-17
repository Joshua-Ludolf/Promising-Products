import { Auth } from "@supabase/auth-ui-react";
import React, { useEffect } from "react";
import supabase from "../../supabase";
import { Navigate } from "react-router-dom";

function Login({ session, setSession }) {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    console.log("what");
    return (
      <div>
        <Auth supabaseClient={supabase} />
      </div>
    );
  }
  if (session != null) {
    console.log("why")
    return <Navigate to={"/home"} />;
  }
}

export default Login;
