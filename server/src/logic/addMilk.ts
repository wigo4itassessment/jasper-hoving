const addMilk = (ageInDays: number, sex: "f" | "m") => {
  // Only female gives milk
  if (sex === "f") return 50 - ageInDays * 0.03;
  else return 0;
};

export default addMilk;
