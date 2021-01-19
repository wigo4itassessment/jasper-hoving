import initHerd from "../../db/herd";
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

  test("calculates stock on day 14", () => {
    expect(calculateStock(initHerd, 14).stock).toEqual({
      milk: 1188.8100000000002,
      skins: 4,
    });
    const newHerd: LabYak[] = [
      {
        age: 4.14,
        name: "Betty-1",
        sex: "f",
        ageLastShaved: 4.13,
      },
      {
        age: 8.14,
        name: "Betty-2",
        sex: "f",
        ageLastShaved: 8,
      },
      {
        age: 9.64,
        name: "Betty-3",
        sex: "f",
        ageLastShaved: 9.5,
      },
    ];
    expect(calculateStock(initHerd, 14).herd).toEqual(newHerd);
  });

  test("yak dies :(", () => {
    const herd: LabYak[] = [
      {
        age: 10,
        name: "Betty-3",
        sex: "f",
      },
    ];
    expect(calculateStock(herd, 1).stock).toEqual({
      milk: 0,
      skins: 0,
    });
    expect(calculateStock(herd, 1).herd).toEqual([]);
  });
});
