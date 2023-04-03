import { NextRequest } from "next/server"
import { City } from "country-state-city"

export const config = {
  runtime: "edge",
}

export default async function handler(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams
    const countryCode = params.get("countryCode")
    const stateCode = params.get("stateCode")

    if (countryCode && stateCode) {
      return new Response(
        JSON.stringify(City.getCitiesOfState(countryCode, stateCode))
      )
    } else {
      return new Response("Bad Request")
    }
  } catch (e) {
    return new Response("Some Error", { status: 400 })
  }
}
