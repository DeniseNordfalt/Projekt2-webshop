import { ProductItem } from "@project-webbshop/shared";
import { UserItem } from "@project-webbshop/shared";
import { CartItem } from "@project-webbshop/shared";
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
  return (await axios.get(`/products/id/${id}`)).data;
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

export const logoutUser = async (): Promise<void> => {
  localStorage.removeItem("access_token");
};

export const getUser = async (): Promise<UserItem | null> => {
  try {
    return (await axios.get("/users/me")).data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getCart = async (): Promise<CartItem[]> => {
  return (await axios.get("/shoppingcart")).data;
};

export const deleteCartItem = async (cartId: string): Promise<void> => {
  await axios.patch("/shoppingcart", { cartId });
};
export const purchase = async (): Promise<void> => {
  await axios.patch("/shoppingcart/purchase")
}

export const getOrders = async (): Promise<CartItem[]> => {
  return (await axios.get("/orders")).data;
};

export const getAllOrders = async (): Promise<CartItem[]> => {
  return await axios.get("/orders/admin");
};

export const changeOrderStatus = async (cartId: string): Promise<void> => {
  await axios.patch("/orders/admin", cartId);
};

export const seachForProducts = async (search: string): Promise<ProductItem[]> => {
  const res = await axios.get(`/products/search/${search}`)
  return res.data as ProductItem[]
}