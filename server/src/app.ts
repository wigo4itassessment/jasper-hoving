import express, { Request, Response, NextFunction } from "express";
import yakshop from "./routes/yakshop";

import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { errorHandler } from "./errors";
require("body-parser-xml")(bodyParser);

//const openApiDocumentation = YAML.load(__dirname + "/assets/openapi.yaml");
export const app = express();

app.use(express.json());
app.use((bodyParser as any).xml());

app.use("/yak-shop", yakshop);
//app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

app.use(errorHandler);
