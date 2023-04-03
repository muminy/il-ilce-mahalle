import axios from "axios"

export const instance = axios.create({
  baseURL: "https://namaz-vakti.vercel.app/api",
})
