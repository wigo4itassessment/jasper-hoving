import { Stock } from "../types";
import { StatusCodes } from "http-status-codes";

type StockStatuses =
  | StatusCodes.CREATED
  | StatusCodes.PARTIAL_CONTENT
  | StatusCodes.NOT_FOUND;

/**
  See if we need to return a complete order or partial. Return status 404 when milk + skins is out of stock
  */
function calculateOrder(
  order: Stock,
  stock: Stock
): { order: Partial<Stock>; status: StockStatuses } {
  let _order: Partial<Stock> = {};

  if (order.milk > stock.milk && order.skins > stock.skins)
    // not found when nothing in stock
    return { order: _order, status: StatusCodes.NOT_FOUND };

  let partial: boolean = false;

  // create partial order
  if (order.milk > stock.milk) partial = true;
  else _order.milk = order.milk;

  if (order.skins > stock.skins) partial = true;
  else _order.skins = order.skins;

  //check if a value is zero. Then also an error
  if (partial) {
    if (_order.milk === 0 || _order.skins === 0)
      return { order: _order, status: StatusCodes.NOT_FOUND };
  }

  return {
    order: _order,
    status: partial ? StatusCodes.PARTIAL_CONTENT : StatusCodes.CREATED,
  };
}

export default calculateOrder;
