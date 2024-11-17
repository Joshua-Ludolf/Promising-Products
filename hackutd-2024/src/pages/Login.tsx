import { Auth } from "@supabase/auth-ui-react";
import React, { useEffect } from "react";
import supabase from "../../supabase";
import { Navigate } from "react-router-dom";
import FrontierLogo from "../assets/frontier-logo-red.svg";

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
    return (
      <main className="w-full">
        <div className="flex flex-col items-center">
          <img src={FrontierLogo} className="w-16 mb-4" />
          <h1 className="text-center">
            Sign In to your <br />
            <span className="text-red ">Frontier Dashboard</span>
          </h1>
          <Auth
            supabaseClient={supabase}
            providers={[]}
            appearance={{
              extend: true,
              // Your custom classes
              className: {
                anchor: "auth-a",
                button: "auth-button",
                input: "auth-input",
                label: "auth-label",
                container: "auth-container",
              },
            }}
          />
        </div>
      </main>
    );
  }
  if (session != null) {
    return <Navigate to={"/home"} />;
  }
}

export default Login;
