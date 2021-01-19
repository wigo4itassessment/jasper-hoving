import { app } from "./app";

const port = 8000;

import WebSocket from "ws";

const wss = new WebSocket.Server({ port: 8080 });

export let websocket: WebSocket | undefined;

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

app.listen(port, () => console.log(`Listening on port ${port}!`));
