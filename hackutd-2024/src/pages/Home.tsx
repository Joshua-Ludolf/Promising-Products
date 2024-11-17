import React from "react";
import Button from "../components/Button";

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
