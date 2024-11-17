import React, { useEffect, useState } from "react";
import Button from "./Button";
import stars from "../assets/star-emoji.svg";
import thumbsUp from "../assets/thumbs-up.svg";
import thumbsDown from "../assets/thumbs-down.svg";
import supabase from "../../supabase";
import jsondata from "../../data.json";
import Groq from "groq-sdk";

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
  const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });
  

  const [insights, setInsights] = useState([]);
  const [dislikedIndex, setDislikedIndex] = useState<number | null>(null);
  const [plan, setPlan] = useState(null);
  const [addOns, setAddOns] = useState(null);
  const [insight, setInsight] = useState(null);

  useEffect(() => {
    async function getInsights(userData) {
      const chatCompletion = await getGroqChatCompletion();

      setInsight(chatCompletion);

      async function getGroqChatCompletion() {
        return groq.chat.completions.create({
          messages: [
            // Set an optional system message. This sets the behavior of the
            // assistant and can be used to provide specific instructions for
            // how it should behave throughout the conversation.
            {
              role: "system",
              content:
                "you are an assistant who needs to convince the user to purchase what they ask. Limit response to one sentence.",
            },
            // Set a user message for the assistant to respond to.
            {
              role: "user",
              content: `Why should i buy this? Here is my data: ${JSON.stringify(
                userData
              )}`,
            },
          ],
          model: "llama3-8b-8192",
        });
      }
    }
    let acc_id = data.acct_id;

    let userData = jsondata[acc_id];

    let plan = userData.insights[0].data.recommended_plan;

    let addOns = userData.insights[0].data.recommended_add_ons;
    setPlan(plan);
    setAddOns(addOns);

    getInsights(userData);


    ;
  }, []);

  console.log("plan " + JSON.stringify(plan));
  console.log("addon " + addOns);
  console.log(insight)

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
      {plan && (
        <div className="card relative bg-lg p-8 rounded-xl flex flex-col w-full">
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
          <div className="flex mb-2 w-full">
            <img className="w-6 mr-2" src={stars} />
            <h2 className=" text-xl text-left font-mono uppercase tracking-wide">
              Consider these upgrades!
            </h2>
          </div>
          {insight && <p>{insight.choices[0].message.content}</p>}
          
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
      )}
    </>
  );
}

export default Recommendation;
