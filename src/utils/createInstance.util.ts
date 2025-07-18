import axios, { Axios, AxiosInstance, AxiosRequestConfig } from "axios";
import { getBaseURL } from "./getBaseURL.util";

export interface APIRequestConfig extends Omit<AxiosRequestConfig, "env"> {
  env?: string;
  prefix?: string;
  baseURL?: string;
}

export const createAxiosInstance = (
  config: APIRequestConfig = {}
): AxiosInstance => {
  const { env = "APP_API", prefix = "", headers = {}, ...restConfig } = config;

  const baseURL = config.baseURL ?? getBaseURL(env) + prefix;
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const jwt = user.jwt ?? user.token ?? "";

  return axios.create({
    ...restConfig,
    baseURL,
    headers: {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${jwt}`,
        ...headers
    }
  })
};
