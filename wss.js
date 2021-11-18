//clinet 를 열어서, 지속적으로 결과를 update 받는 server

import WebSocket, { WebSocketServer } from "ws";
// import connectToMongoDB from "./watch.js";
const wss = new WebSocketServer({ port: 3000 });

const connectWebSocket = (callback) => {
  wss.on("connection", (ws) => {
    //ws.send("Hello, I am a server.");
    ws.on("message", (message) => {
      console.log("Received: %s", message);
    });

    if (typeof callback === "function") {
      callback(ws);
    }
  });
};

export default connectWebSocket;
