import React from "react";
import Button from "../components/Button";
import Card from "../components/Card";

function Home({ signOut }) {
  return (
    <>
      <section className="w-full">
      <div>Home</div>
      <Button text={"Hello"} onClick={signOut} />
      

      </section>
      
    </>
  );
}

export default Home;
