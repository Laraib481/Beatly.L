import axios from "axios";

const API = axios.create({
  baseURL: "https://beatly-l.vercel.app/api",
  withCredentials: true,
});

export default API;