import { useState, useEffect, useRef } from "react";
import MqttMessage from "./mqtt";

const Ipad = () => {
  const [value, setValue] = useState("");

  const mqtt = useRef<null | MqttMessage>(null);

  useEffect(() => {
    const MQTT = new MqttMessage({
      topic: "home",
      host: "broker.emqx.io",
      port: 8083,
      receiveMessage: (val) => {},
    });
    mqtt.current = MQTT;
  }, []);

  const sendValue = () => {
    if (mqtt.current) mqtt.current.sendMessage(value);
  };
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={sendValue}>发送</button>
    </div>
  );
};

export default Ipad;
