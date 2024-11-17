import React from "react";
import Recommendation from "./Recommendation";



function Insights({ data, session }) {
  return (
    <section className="w-full mt-14">
      <h1 className="text-6xl mb-8">AI <span className="text-red">Insights</span></h1>
      <div className="flex flex-wrap justify-evenly w-full gap-4">
        <Recommendation data={data} session={session} />
      </div>
    </section>
  );
}

export default Insights;
