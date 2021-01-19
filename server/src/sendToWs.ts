import { getHerd } from "./db/herd";
import { subtractOrders } from "./db/order";
import calculateStock from "./logic/calculateStock";
import { websocket } from "./server";

function sendToWs(herd, day) {
  if (websocket)
    websocket.send(
      JSON.stringify({
        herd: calculateStock(herd, day).herd,
        stock: subtractOrders(calculateStock(herd, day).stock),
      })
    );
}

export default sendToWs;
