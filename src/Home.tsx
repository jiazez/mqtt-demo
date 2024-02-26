import React, { useState, useEffect } from "react";
import MqttMessage from "./mqtt";

const Home = () => {
  const [value, setValue] = useState("");
  useEffect(() => {
    new MqttMessage({
      topic: "home",
      host: "broker.emqx.io",
      port: 8083,
      receiveMessage: (val) => {
        console.log(`接收到了消息===>${val}`);
        setValue(val);
      },
    });
  }, []);
  return <div>{`接收到了消息===>${value}`}</div>;
};

export default Home;
