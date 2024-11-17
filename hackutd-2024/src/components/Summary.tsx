import React, { useEffect, useState } from "react";
import Card from "./Card";
import { PieChart } from "react-minimal-pie-chart";

function Summary({ data }) {
  const [usage, setUsage] = useState(0);
  const [plan, setPlan] = useState("");
  const [signalStrength, setSignalStrength] = useState([]);
  const [viewMore, setViewMore] = useState(false);
  const [viewText, setViewText] = useState("View More");
  const [rx, setRx] = useState(0);
  const [tx, setTx] = useState(0);

  function handleView() {
    setViewMore(!viewMore);
    setViewText(viewMore ? "View More" : "View Less");
  }

  function calculateUsage() {
    let totalUsage = data.rx_max_bps + data.tx_max_bps;
    setUsage(Number((totalUsage / 1e6).toFixed(2)));
    setRx(Number((data.rx_max_bps / 1e6).toFixed(2)));
    setTx(Number((data.tx_max_bps / 1e6).toFixed(2)));
  }
  function toMbps(num) {
    let mpbs = Number((num / 1e6).toFixed(2));
    return mpbs;
  }

  function calculateSignalStrength() {
    let signal = data.rssi_mean;
    if (signal > -30) {
      setSignalStrength([0, "Strong", "green"]);
    } else if (signal > -67) {
      setSignalStrength([1, "OK", "green"]);
    } else {
      setSignalStrength([2, "Poor", "red"]);
    }
  }

  let plans = {
    "1000.0M": "Fiber 1 GB",
    "500.0M": "Fiber 500 MB",
    "2000.0M": "Fiber 2 GB",
    "200.0M": "Fiber 200 MB",
    "100.0M": "Fiber 100 MB",
    "150.0M": "Fiber 150 MB",
    "5000.0M": "Fiber 5 GB",
    "300.0M": "Fiber 300 MB",
    "7000.0M": "Fiber 7 GB",
  };

  useEffect(() => {
    if (data) {
      setPlan(plans[data.network_speed]);
    }
    calculateUsage();
    calculateSignalStrength();
  }, []);

  // console.log(plan);

  // console.log(data);
  // console.log(signalStrength);
  return (
    <section className="w-full ">
      <h1 className="text-6xl mb-8">
        Your <span className="text-red">Summary</span>
      </h1>
      <div className="flex flex-wrap justify-evenly w-full gap-4">
        <Card title={"Current Plan"} text={plan} />
        <Card
          title={"# Devices"}
          text={data.wireless_clients_count + data.wired_clients_count}
        />
        <Card title={"Max Usage"} text={usage + " Mbps"} />
        <Card
          title={"Wi-Fi Strength"}
          text={signalStrength[1]}
          color={signalStrength[2]}
        />
      </div>
      {viewMore && (
        <div className=" mt-8 flex justify-evenly w-full gap-2 text-center">
          <Card title={"# Extenders"} text={data.extenders} />
          <Card
            title={"Wired/Wireless Clients"}
            text={
              <>
                <PieChart
                  className="w-[160px]"
                  labelStyle={{ fontSize: "8px" }}
                  label={({ dataEntry }) => dataEntry.title}
                  data={[
                    {
                      title: "Wired",
                      value: data.wired_clients_count,
                      color: "#FF0037",
                    },
                    {
                      title: "Wireless",
                      value: data.wireless_clients_count,
                      color: "#96fff5",
                    },
                  ]}
                />
                <div className="">
                  <p className="text-sm">
                    <span className="text-blue">Wired : </span>
                    {data.wired_clients_count}
                    {"  "}
                    <span className="text-blue">Wireless : </span>
                    {data.wireless_clients_count}
                  </p>
                </div>
              </>
            }
          />
          <Card title={"Peak Download Usage"} text={rx + " Mbps"} />
          <Card title={"Peak Upload Usage"} text={tx + " Mbps"} />
        </div>
      )}
      <button onClick={handleView} className="uppercase w-full mt-10 hover:underline transition-all">
        {viewText}
      </button>
    </section>
  );
}

export default Summary;
