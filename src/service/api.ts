import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

export interface ApiResponse {
  statusCode?: number;
  msg?: string;
  error?: boolean;
}

export const urlApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

function handleApiError(error: any): ApiResponse {
  const { response } = error;
  return {
    statusCode: response?.status,
    msg: response?.data?.msg || "An error occurred",
    error: true
  };
}

export async function apiCall<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response: AxiosResponse<T> = await urlApi(config);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}
