import { LabYak } from "../types";
import { resetOrders } from "./order";

/* 
  In production, this would be a real database. For this project, it is an in memory storage
*/

let herd: LabYak[] = [
  {
    age: 4,
    name: "Betty-1",
    sex: "f",
  },
  {
    age: 8,
    name: "Betty-2",
    sex: "f",
  },
  {
    age: 9.5,
    name: "Betty-3",
    sex: "f",
  },
];

export function getHerd() {
  return herd;
}

export function loadHerd(newHerd: LabYak[]) {
  herd = newHerd;
  resetOrders();
}

export default herd;
