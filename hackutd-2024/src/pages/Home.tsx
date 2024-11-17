import React from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Summary from "../components/Summary";
import Insights from "../components/Insights";

type HomeProps = {
  signOut?: () => void;
  session: any;
  data: any;
};

function Home({ session, data }: HomeProps) {
  return session && data ? (
    <>
      <Summary data={data} />
      {data.insights && (<Insights data={data} session={session} />)}
      
    </>
  ) : (
    <div>loading</div>
  );
}

export default Home;

