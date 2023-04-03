import { NextApiResponse } from "next"
import { NextRequest } from "next/server"
import { Country } from "country-state-city"

export const config = {
  runtime: "edge",
}

export default async function handler(req: NextRequest) {
  try {
    return new Response(JSON.stringify(Country.getAllCountries()))
  } catch (e) {
    return new Response("Some Error")
  }
}
