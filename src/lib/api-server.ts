import axios from "axios";

const apiServer = axios.create({
  baseURL: "https://shireff-nady-server.vercel.app/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    // "Accept-Language": "ar", // أو خليها dynamic لو عايز
  },
});

export default apiServer;
