import "./index.css";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import supabase from "../supabase";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Groq from "groq-sdk";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [data, setData] = useState(null);
  const [insight, setInsight] = useState(null)

  const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });
  

  useEffect(() => {
    // Fetch the current session from Supabase and set it in state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      fetchData(session);
    });

    getInsights()
  }, []);

  // console.log(session);
  // console.log(data);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    // console.log("sign out");
    setSession(null);
    return <Navigate to="/" />;
  }

  async function fetchData(sesh) {
    const { data, error } = await supabase
      .from("profile") // Replace 'profile' with your actual table name
      .select("*") // Select all columns, or specify which columns you need
      .eq("sess-id", sesh.user.id) // Filter by UID
      .single(); // Ensure it returns only one record

    setData(data);
    // console.log("lol");
  }



  async function getInsights(){
    const chatCompletion = await getGroqChatCompletion();

    setInsight(chatCompletion)

    async function getGroqChatCompletion() {
      return groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: "Explain the importance of fast language models",
          },
        ],
        model: "llama3-8b-8192",
      });}
  }
  console.log(insight)

    
  

  
  // console.log(data)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login session={session} setSession={setSession} />}
          />
          <Route
            element={<ProtectedRoutes session={session} signOut={signOut} />}
          >
            <Route path="/home" element={<Home session={session} data={data} />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
