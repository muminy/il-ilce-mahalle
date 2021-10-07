// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import axios from "axios";
import cities from "../../addresses/cities.json";
import districts from "../../addresses/districts.json";

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const apiCity =
    "https://public-sdc.trendyol.com/discovery-web-accountgw-service/api/locations/city/{code}/districts?culture=tr-TR&storefrontId=1&countryCode=TR";

  cities.map((item: any) => {
    axios.get(apiCity.replace("{code}", item.id)).then((responseJson: any) => {
      const dists = responseJson.data.result.map((dists: any, index: number) => ({
        ...dists,
        code: item.code,
        new_id: `${item.code}_${index + 1}`,
      }));

      districts.push(dists);
    });
  });

  setTimeout(() => {
    fs.writeFile("./addresses/districts.json", JSON.stringify(districts), (error) =>
      console.log(error)
    );
  }, 3000);

  res.status(200).json({ name: "John Doe" });
}
