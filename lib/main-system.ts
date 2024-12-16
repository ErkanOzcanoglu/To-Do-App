import axios from "axios";

if (!process.env.EXPO_PUBLIC_LOCAL_GO_BACKEND_URL) {
  throw new Error("Missing EXPO_PUBLIC_LOCAL_GO_BACKEND_URL");
}

export const mainSystem = axios.create({
  baseURL: process.env.EXPO_PUBLIC_LOCAL_GO_BACKEND_URL,
  headers: {
    "Content-Type": "application/json charset=utf-8",
  },
});
