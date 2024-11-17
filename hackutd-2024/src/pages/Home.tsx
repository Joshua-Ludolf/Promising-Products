import React from "react";

function Home({ signOut }) {
  return (
    <>
      <div>Home</div>
      <button onClick={signOut}>
        sign oout
      </button>
    </>
  );
}

export default Home;
