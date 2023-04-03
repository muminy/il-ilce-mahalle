import { NextRequest } from "next/server"
import { State } from "country-state-city"

export const config = {
  runtime: "edge",
}

export default async function handler(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams
    const countryCode = params.get("countryCode")
    const states = State.getStatesOfCountry(countryCode ?? "TR")

    return new Response(JSON.stringify(states))
  } catch (e) {
    return new Response("Some Error", { status: 400 })
  }
}
