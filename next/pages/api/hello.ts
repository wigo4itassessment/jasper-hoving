// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

let someState = 0;

export default (req: NextApiRequest, res: NextApiResponse) => {
  someState++;

  res.statusCode = 200;
  res.json({ name: "John Doe", someState });
};
