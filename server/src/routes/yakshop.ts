import express from "express";
import validate from "../middleware/validate";

import { getHerd, loadHerd } from "../db/herd";
import calculateStock from "../logic/calculateStock";
import {
  serializeHerd,
  validateDay,
  validateLoad,
  validateOrder,
} from "./validation";
import { LabYak, ValidatedRequest } from "../types";
import { placeOrder, subtractOrders } from "../db/order";
import calculateOrder from "../logic/calculateOrder";
import { StatusCodes } from "http-status-codes";
import { ResponseError } from "../errors";
import sendToWs from "../sendToWs";

const router = express.Router();

/** get the stock at day T */
router.get("/stock/:day", validate(validateDay), (req, res) => {
  const herd = getHerd();

  const { day } = req.params;
  const { stock } = calculateStock(herd, parseInt(day));
  const currentStock = subtractOrders(stock);
  res.send(currentStock);
});

/** get the herd at day T */
router.get("/herd/:day", validate(validateDay), (req, res) => {
  const herd = getHerd();
  const { day } = req.params;
  const stock = calculateStock(herd, parseInt(day));
  res.send({ herd: serializeHerd(stock.herd) });
});

/** destroy EVERTHING and load a new herd */
router.post("/load", validate(validateLoad), (req: ValidatedRequest, res) => {
  const data: LabYak[] = req.validatedData!.herd.labyak.map(
    (obj: any) => obj["$"] // process the xml input
  );
  loadHerd(data);

  res.status(205).send({ message: "Herd loaded :)" });
});

/** Post a new order to the database */
router.post(
  "/order/:day",
  validate(validateDay),
  validate(validateOrder),
  (req: ValidatedRequest, res) => {
    const data = req.validatedData!;
    const herd = getHerd();
    const { day } = req.params;

    const stock = calculateStock(herd, parseInt(day)).stock;
    const currentStock = subtractOrders(stock);
    const { order, status } = calculateOrder(data.order, currentStock);
    if (status === StatusCodes.NOT_FOUND) throw new ResponseError(status);
    placeOrder(data.customer, order);

    sendToWs(herd, day);
    res.status(status).send(order);
  }
);

export default router;
