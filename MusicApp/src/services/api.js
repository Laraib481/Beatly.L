import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // apna backend port lagana
  withCredentials: true,
});

export default API;