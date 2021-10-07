// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { City, State } from "country-state-city";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "POST") {
    if (!req.body.countryCode || !req.body.stateCode) {
      return res.json({ error: "Bad Request" });
    } else {
      const getName = State.getStateByCodeAndCountry(
        req.body.stateCode,
        req.body.countryCode
      )?.name.replace(" Province", "");

      res.status(200).json({
        data: City.getCitiesOfState(req.body.countryCode, req.body.stateCode).filter(
          (item) => item.name !== getName && item.name.search(" İlçesi") === -1
        ),
      });
    }
  } else {
    res.json({ error: "Bad Request" });
  }
}
