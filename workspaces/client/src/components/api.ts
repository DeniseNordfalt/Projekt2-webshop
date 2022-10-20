import { CartItem, ProductItem } from "@project-webbshop/shared";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
axios.interceptors.request.use((config) => {
  if (!config?.headers) {
    config.headers = {};
  }
  const jwt = localStorage.getItem("access_token");
  if (jwt) {
    config.headers["authorization"] = `Bearer ${jwt}`;
  }
  return config;
});

export const getProducts = async (): Promise<ProductItem[]> => {
  return (await axios.get("/products")).data;
};

export const getProductById = async (id: string): Promise<ProductItem> => {
  return (await axios.get(`/products/${id}`)).data;
};
