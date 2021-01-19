import WebSocket from "ws";

export let websocket: WebSocket | undefined;

const startSocket = () => {
  const wss = new WebSocket.Server({ port: 8080 });
  wss.on("connection", function connection(ws) {
    websocket = ws;
    ws.on("message", function incoming(message) {
      console.log("received: %s", message);
    });

    ws.on("close", () => {
      websocket = undefined;
    });

    ws.send("something");
  });
};

export default startSocket;
