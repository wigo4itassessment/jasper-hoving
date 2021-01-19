import range from "lodash/range";
import { LabYak, Stock } from "src/types";
import addMilk from "./addMilk";
import shouldShave from "./shouldShave";

const calculateStock = (
  initHerd: LabYak[],
  days: number
): { stock: Stock; herd: LabYak[] } => {
  let milk = 0;
  let ageLastShavedList: (number | null)[] = initHerd.map((yak) => null); // day last shaved  can be null
  let skins = 0;
  let newHerd: LabYak[] = [];

  for (const day of range(days)) {
    initHerd.forEach((yak, index) => {
      const ageInDays = yak.age * 100 + day;

      if (ageInDays >= 1000) {
        // Yak dies
        return;
      }

      milk += addMilk(ageInDays, yak.sex);

      if (shouldShave(day, ageLastShavedList[index], yak.age, ageInDays)) {
        ageLastShavedList[index] = ageInDays / 100;
        skins += 1;
      }

      // last day!
      if (day === days - 1) {
        newHerd.push({
          ...yak,
          age: (ageInDays + 1) / 100,
          ageLastShaved: ageLastShavedList[index],
        });
      }
    });
  }
  return { stock: { milk, skins }, herd: newHerd };
};

export default calculateStock;
