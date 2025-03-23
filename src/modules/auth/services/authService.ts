import { api } from "../../../api/backend";
import { User, ResponseApiAuth } from "../entities/userEntity";

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post<ResponseApiAuth>("/auth/login", {
      email,
      password,
    });
    if (response.status === 200) {
      return { ...User.fromApi(response.data.data) };
    }
  },

  register: async (name: string, email: string, password: string) => {
    const response = await api.post<ResponseApiAuth>("/auth/register", {
      name,
      email,
      password,
    });
    if (response.status === 200) {
      return { ...User.fromApi(response.data.data) };
    }
  },
};
