import express, { Request, Response, NextFunction } from "express";
import yakshop from "./routes/yakshop";

import bodyParser from "body-parser";
import { errorHandler } from "./errors";
require("body-parser-xml")(bodyParser);

export const app = express();

app.use(express.json());
app.use((bodyParser as any).xml());

app.use("/yak-shop", yakshop);

app.use(errorHandler);
