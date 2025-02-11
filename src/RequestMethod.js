import axios from "axios";

const BASE_URL = "https://server.amiraf.shop/api/";

let user = JSON.parse(localStorage.getItem("persist:root"))?.user;
let currentUser = user && JSON.parse(user).currentUser;
let accessToken = currentUser?.accessToken || "";
let refreshToken = currentUser?.refreshToken || "";

const publicRequest = axios.create({
  baseURL: BASE_URL,
});

const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

// INTERCEPTOR TO HANDLE TOKEN EXPIRATION
userRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      try {
        const res = await axios.post(`${BASE_URL}auth/refresh-token`, { refreshToken });
        accessToken = res.data.accessToken;

        // Update token in localStorage
        currentUser = { ...currentUser, accessToken };
        localStorage.setItem(
          "persist:root",
          JSON.stringify({ user: JSON.stringify({ currentUser }) })
        );

        // Update axios instance
        userRequest.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

        // Retry the failed request
        error.config.headers["Authorization"] = `Bearer ${accessToken}`;
        return axios(error.config);
      } catch (err) {
        console.error("Token refresh failed", err);
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export { publicRequest, userRequest };
