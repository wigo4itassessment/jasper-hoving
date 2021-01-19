import { start } from "repl";
import { app } from "./app";
import startSocket from "./socket";
const port = 8000;

startSocket();

app.listen(port, () => console.log(`Listening on port ${port}!`));
