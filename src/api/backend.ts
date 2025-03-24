import axios from "axios";
import { getLocalStorage } from "../modules/common/utils";
import { User } from "../modules/auth/entities/userEntity";
import { store } from "../store";
import { logout, updateToken } from "../modules/auth/authSlice";

export const apiToken = axios.create({
  baseURL: "http://localhost:3000/api",
});

apiToken.interceptors.request.use((config) => {
  const user = getLocalStorage<User>("user");
  const token = user?.token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

apiToken.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const user = getLocalStorage<User>("user");
        const response = await axios.post(
          "http://localhost:3000/api/auth/refresh-token",
          { refreshToken: user?.refreshToken }
        );
        if (response.status === 200) {
          // Guarda el nuevo token en Redux y localStorage
          store.dispatch(updateToken(response.data.token));

          // Actualiza el encabezado y reintenta la solicitud original
          originalRequest.headers["Authorization"] =
            `Bearer ${response.data.token}`;
          return apiToken(originalRequest);
        }

        if (response.status === 401) {
          store.dispatch(logout());
          return;
        }
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default apiToken;

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});
