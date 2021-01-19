import { Request } from "express";

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

export interface ValidatedRequest extends Request {
  validatedData?: any;
}

export interface Order {
  customer: string;
  order: Stock;
}
