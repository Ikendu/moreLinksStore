import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/store_api/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
