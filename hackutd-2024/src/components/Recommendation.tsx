import React, { useEffect, useState } from "react";
import Button from "./Button";
import stars from "../assets/star-emoji.svg";
import thumbsUp from "../assets/thumbs-up.svg";
import thumbsDown from "../assets/thumbs-down.svg";
import supabase from "../../supabase";
import jsondata from "../../data.json";

interface RecommendationProps {
  data: {
    insights: {
      summary: string;
      text: string;
      link: string;
    }[];
  };
}

function Recommendation({ data, session }: RecommendationProps) {
  const [insights, setInsights] = useState([]);
  const [dislikedIndex, setDislikedIndex] = useState<number | null>(null);
  const [plan, setPlan] = useState(null);
  const [addOns, setAddOns] = useState(null);

  useEffect(() => {
    let acc_id = data.acct_id;

    let userData = jsondata[acc_id];

    let plan = userData.insights[0].data.recommended_plan;

    let addOns = userData.insights[0].data.recommended_add_ons;
    setPlan(plan)
    setAddOns(addOns)

    
  }, []);

    console.log("plan " + JSON.stringify(plan));
    console.log("addon " + addOns);

  async function handleDislike(indexToRemove: number) {
    // console.log(indexToRemove);
    setDislikedIndex(indexToRemove); // Set the disliked index
    const newData = insights.filter((_, index) => index !== indexToRemove);
    setInsights(newData);
    if (newData.length == 0) {
      setInsights(null);
    }

    // console.log(newData);
    const { error } = await supabase
      .from("profile")
      .update({ insights: newData })
      .eq("sess-id", session.user.id);

    if (error) console.error(error);
  }

  return (
    <>
      {plan &&
        
          <div
            className="card relative bg-lg p-8 rounded-xl flex flex-col w-[346px]"
          >
            {/* Feedback Message */}
            {/* <div
              className={`feedback absolute w-full bg-red left-0 top-0 h-full flex justify-center items-center place-content-center text-center rounded-xl pointer-events-none transition-opacity duration-300 ${
                dislikedIndex === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-[#ffffff]">
                Feedback Received.
                <br /> Thank you!
              </p>
            </div> */}

            {/* Card Content */}
            <div className="flex mb-2">
              <img className="w-6 mr-2" src={stars} />
              <h2 className=" text-xl text-left font-mono uppercase tracking-wide">
                We recommend upgrading to...
              </h2>
            </div>
            <p>{plan.name}</p>
            <div className="mt-8 justify-between-b flex w-full">
              <a target="_blank" rel="noopener noreferrer">
                <Button text={"Learn More"} onClick={() => {}} />
              </a>
              {/* <div className="flex justify-center mx-auto">
                <button className="text-white bg-red h-[44px] p-4 rounded-full mr-1 hover:bg-blue transition-all">
                  <img src={thumbsUp} />
                </button>
                <button
                  onClick={() => handleDislike(index)}
                  className="text-white bg-red h-[44px] p-4 rounded-full ml-1 hover:bg-blue transition-all"
                >
                  <img src={thumbsDown} />
                </button>
              </div> */}
            </div>
          </div>
        }
    </>
  );
}

export default Recommendation;
