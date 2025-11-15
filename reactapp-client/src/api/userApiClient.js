// path: reactapp-client/src/api/userApiClient.js
import axios from "axios";

// Axios dùng cho phía user (khách, người mua)
const userApiClient = axios.create({
  baseURL: "http://localhost:8080/api",
});

userApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default userApiClient;
