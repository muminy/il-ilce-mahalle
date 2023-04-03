import dayjs from "dayjs"
import { NextRequest } from "next/server"

export const config = {
  runtime: "edge",
}

export default async function handler(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const latitude = params.get("latitude")
  const longitude = params.get("longitude")
  const date = dayjs(new Date()).format("YYYY-M-D")

  try {
    if (!latitude || !longitude) {
      return new Response("Bad Request", { status: 400 })
    }

    const url = new URL(
      `/api/timesFromCoordinates`,
      process.env.DIYANET_API
    )
    url.searchParams.append("lat", latitude)
    url.searchParams.append("lng", longitude)
    url.searchParams.append("timezoneOffset", "180")
    url.searchParams.append("days", "30")
    url.searchParams.append("date", date)

    const response = await fetch(url)
    const data = await response.json()

    const times = Object.keys(data.times).map((item) => ({
      date: item,
      times: data.times[item],
    }))

    return new Response(JSON.stringify(times))
  } catch (e) {
    console.log(e)
    return new Response("Some Error", { status: 400 })
  }
}
