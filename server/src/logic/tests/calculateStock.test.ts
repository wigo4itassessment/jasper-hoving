import initHerd from "../../initHerd";
import { LabYak } from "../../types";
import calculateStock from "../calculateStock";

describe("Calculate stock", () => {
  it("calculates stock on day 13", () => {
    expect(calculateStock(initHerd, 13).stock).toEqual({
      milk: 1104.4800000000005,
      skins: 3,
    });
    const newHerd: LabYak[] = [
      {
        age: 4.13,
        name: "Betty-1",
        sex: "f",
        ageLastShaved: 4,
      },
      {
        age: 8.13,
        name: "Betty-2",
        sex: "f",
        ageLastShaved: 8,
      },
      {
        age: 9.63,
        name: "Betty-3",
        sex: "f",
        ageLastShaved: 9.5,
      },
    ];
    expect(calculateStock(initHerd, 13).herd).toEqual(newHerd);
  });
});
