/* 
  In production, this would be a real database. For this project, it is an in memory storage
*/

import { Order, Stock } from "../types";

export let orders: Order[] = [];

export function resetOrders() {
  orders = [];
}

export function getOrders() {
  return orders;
}

/** 
    Subtract all the orders from the current calculated stock
  */
export function subtractOrders(stock: Stock): Stock {
  return orders.reduce(
    (acc, current) => {
      const { milk, skins } = current.order;
      return { milk: acc.milk - milk, skins: acc.skins - skins };
    },
    { milk: stock.milk, skins: stock.skins }
  );
}

export function placeOrder(customer: string, order: Partial<Stock>) {
  const milk = order.milk || 0;
  const skins = order.skins || 0;
  orders.push({ customer, order: { milk, skins } });
}
