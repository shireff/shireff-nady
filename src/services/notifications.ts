import api from "./api";

export interface RegisterTokenData {
  token: string;
  deviceType: string;
  browser: string;
  platform: string;
}

export const notificationService = {
  registerToken: async (data: RegisterTokenData) => {
    const response = await api.post("/notifications/register", data);
    return response.data;
  },

  unsubscribeToken: async (token: string) => {
    const response = await api.post("/notifications/unsubscribe", { token });
    return response.data;
  },

  sendNotification: async (title?: string, body?: string) => {
    const response = await api.post("/notifications/send", { title, body });
    return response.data;
  },
};
