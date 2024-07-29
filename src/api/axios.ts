import { ENV } from "@app/constants";
import axios from "axios";

export const api = axios.create({
  baseURL: ENV.API_HOST,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});
