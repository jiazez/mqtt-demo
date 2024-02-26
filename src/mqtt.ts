import Paho, { MQTTError, Message } from "paho-mqtt";

interface ConfigType {
  host: string;
  port: number;
  topic: string;
  receiveMessage: (message: any) => void;
}

class MqttMessage {
  client: any;
  config: ConfigType;
  constructor(config: ConfigType) {
    const { host, port } = config;

    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

    const client = new Paho.Client(host, port, "/mqtt", clientId);

    client.onConnectionLost = this.onConnectionLost;

    client.onMessageArrived = this.onMessageArrived;

    client.connect({
      onSuccess: this.onConnect,
      keepAliveInterval: 60 * 30,
      reconnect: true,
      timeout: 1,
      mqttVersion: 4,
    });

    this.client = client;

    this.config = config;
  }
  onConnect = () => {
    console.log("ws 连接成功");

    this.client.subscribe(this.config.topic);

    console.log(`订阅主题 ${this.config.topic}`);
  };
  onConnectionLost = (responseObject: MQTTError) => {
    if (responseObject.errorCode !== 0) console.log(">>>", responseObject);

    console.log("onConnectionLost:" + responseObject.errorMessage);
  };
  onMessageArrived = (message: Message) => {
    const res = JSON.parse(message.payloadString);

    this.config.receiveMessage(res);
  };
  sendMessage = (message = "") => {
    const will = new Paho.Message(JSON.stringify(message));
    will.destinationName = this.config.topic;
    will.qos = 0;
    will.retained = false;
    if (this.client && this.client.isConnected()) this.client.send(will);
  };
}

export default MqttMessage;
