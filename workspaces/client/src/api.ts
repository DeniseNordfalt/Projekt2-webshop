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

export const addToCart = async (productId: string): Promise<void> => {
  console.log("productID", productId);
  await axios.post("/shoppingcart", { productId });
};

export const getProducts = async (): Promise<ProductItem[]> => {
  return (await axios.get("/products")).data;
};

export const getProductById = async (id: string): Promise<ProductItem> => {
  return (await axios.get(`/products/id/${id}`)).data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  phoneNumber: string,
  deliveryAddress: object
): Promise<UserItem | null> => {
  try {
    return (
      await axios.post("/users", {
        name,
        email,
        password,
        phoneNumber,
        deliveryAddress,
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
  await axios.get("/shoppingcart/purchase");
};

export const editProduct = async (id: string, form: FormData) => {
  await axios.patch(`products/id/${id}`, form);
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

export const addNewProduct = async (form: any): Promise<void> => {
  await axios.post("/products", form );
}
