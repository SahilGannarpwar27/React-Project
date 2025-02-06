export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  SIGNUP: `${API_BASE_URL}/signup/`,
  LOGIN: `${API_BASE_URL}/login/`,
  FORGOT_PASSWORD: `${API_BASE_URL}/forgot-password/`,
  RESET_PASSWORD: `${API_BASE_URL}/reset-password/`,
};
