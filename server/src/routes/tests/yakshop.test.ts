import request from "supertest";
import yakshop from "../yakshop";
import { app } from "../../app";
import { LabYak } from "../../types";
import { getOrders, resetOrders } from "../../db/order";

const initHerd: LabYak[] = [
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

app.use("/yak-shop", yakshop);

describe("test routes", () => {
  beforeEach(() => {
    resetOrders();
  });
  test("stock", async () => {
    await request(app).get("/yak-shop/stock/13").expect(200, {
      milk: 1104.4800000000005,
      skins: 3,
    });
  });
  test("herd", async () => {
    await request(app)
      .get("/yak-shop/herd/13")
      .expect(200, {
        herd: [
          {
            age: 4.13,
            name: "Betty-1",
            "age-last-shaved": 4,
          },
          {
            age: 8.13,
            name: "Betty-2",
            "age-last-shaved": 8,
          },
          {
            age: 9.63,
            name: "Betty-3",
            "age-last-shaved": 9.5,
          },
        ],
      });
  });

  test("order 201", async () => {
    const response = await request(app)
      .post("/yak-shop/order/13")
      .send({ customer: "Luke Skywalker", order: { milk: 20, skins: 1 } })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(201);

    expect(response.body).toEqual({ milk: 20, skins: 1 });
    expect(getOrders()).toEqual([
      {
        customer: "Luke Skywalker",
        order: { milk: 20, skins: 1 },
      },
    ]);
  });
  test("order 206", async () => {
    const response = await request(app)
      .post("/yak-shop/order/13")
      .send({ customer: "Luke Skywalker", order: { milk: 20, skins: 5 } })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(206);

    expect(response.body).toEqual({ milk: 20 });
    expect(getOrders()).toEqual([
      {
        customer: "Luke Skywalker",
        order: { milk: 20, skins: 0 },
      },
    ]);
  });

  test("order 404", async () => {
    const response = await request(app)
      .post("/yak-shop/order/13")
      .send({ customer: "Luke Skywalker", order: { milk: 200000, skins: 5 } })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404);

    expect(getOrders()).toEqual([]);
  });
});
