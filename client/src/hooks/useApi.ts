import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface ApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export interface ApiRequestHook {
  sendRequest: (
    url: string,
    options?: AxiosRequestConfig
  ) => Promise<AxiosResponse<any>>;
  isLoading: boolean;
  error: Error | null;
}

export const useApi = <T = any>(
  url: string,
  options?: AxiosRequestConfig
): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const { sendRequest, isLoading, error } = useApiRequest();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await sendRequest(url, options);
        setData(response.data);
      } catch (err: any) {
        setData(null);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, isLoading, error };
};

export const useApiRequest = ():ApiRequestHook => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const sendRequest = async (url: string, options?: AxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`,
      withCredentials: true,
    };

    setIsLoading(true);

    try {
      const response = await axios(url, { ...options, headers });
      return response;
    } catch (error: any) {
      console.error("API request failed:", error);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendRequest, isLoading, error };
};
