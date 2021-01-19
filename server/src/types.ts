export interface LabYak {
  age: number;
  name: string;
  sex: "f" | "m";
  ageLastShaved?: number | null;
}

export interface Stock {
  milk: number;
  skins: number;
}
