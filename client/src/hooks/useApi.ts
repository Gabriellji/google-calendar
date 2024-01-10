import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface UseApiHook {
  data: AxiosResponse | null;
  isLoading: boolean;
  error: Error | null;
}

interface UseApiRequestHook extends Pick<UseApiHook, "isLoading" | "error"> {
  sendRequest: (
    url: string,
    options?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  response: number | null;
}

export const useApi = (
  url: string,
  options?: AxiosRequestConfig
): UseApiHook => {
  const [data, setData] = useState<AxiosResponse | null>(null);
  const { sendRequest, isLoading, error } = useApiRequest();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(url, options);
        setData(responseData);
      } catch (error: any) {
        setData(null);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, isLoading, error };
};

export const useApiRequest = (): UseApiRequestHook => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<number | null>(null);

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
      setResponse(response.status);
      return response;
    } catch (error: any) {
      console.error("API request failed:", error);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendRequest, isLoading, error, response };
};
