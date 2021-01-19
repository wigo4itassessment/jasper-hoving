export interface LabYak {
  age: number
  name: string
  sex: "f" | "m"
  ageLastShaved?: number | null
}

export interface Stock {
  milk: number
  skins: number
}

export interface Order {
  customer: string
  order: Stock
}

export interface HerdResponse {
  name: string
  age: string
  "age-last-shaved": number
}

export interface StockResponse {
  milk: number
  skins: number
}
