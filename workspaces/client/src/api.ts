import { ProductItem } from "@project-webbshop/shared";
import { UserItem } from "@project-webbshop/shared";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
console.log(process.env.REACT_APP_SERVER_URL);
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

export const registerUser = async (
  email: string,
  name: string,
  password: string,
  phone: string,
  deliveryAdress: string
): Promise<UserItem | null> => {
  try {
    return (
      await axios.post("/users", {
        email,
        name,
        password,
        phone,
        deliveryAdress,
      })
    ).data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<UserItem | null> => {
  const res = await axios.post("/auth", { email, password });
  if (res.data.user) {
    localStorage.setItem("access_token", res.data.token);
    return res.data.user;
  } else {
    return null;
  }
};
