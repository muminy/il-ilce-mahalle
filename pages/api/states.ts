// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { State } from "country-state-city";
import { IState } from "country-state-city/dist/lib/interface";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "POST" && req.body.countryCode) {
    res.status(200).json({
      data: State.getStatesOfCountry(req.body.countryCode).map((item: IState) => ({
        ...item,
        name: item.name.replace(" Province", ""),
      })),
    });
  } else {
    res.json({ error: "Bad Request" });
  }
}
