import { ENV } from "@app/constants";
import axios from "axios";
console.log(ENV.API_HOST);
export const api = axios.create({
  baseURL: ENV.API_HOST,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});
