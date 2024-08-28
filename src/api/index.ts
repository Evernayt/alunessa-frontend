import { getToken } from "@/helpers/localStorage";
import axios from "axios";

const $host = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
});

const authInterceptor = async (config: any) => {
  config.headers.authorization = `Bearer ${getToken()}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
