import React from "react";
import Button from "../components/Button";
import Card from "../components/Card";

function Home({ signOut }) {
  return (
    <>
      <div>Home</div>
      <Button text={"Hello"} onClick={signOut} />
      

      
    </>
  );
}

export default Home;
