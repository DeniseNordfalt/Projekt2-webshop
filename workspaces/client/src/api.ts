import { OrderItem, ProductItem } from "@project-webbshop/shared";
import { UserItem } from "@project-webbshop/shared";
import { CartItem } from "@project-webbshop/shared";
import axios, { AxiosResponse } from "axios";

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

export const addToCart = async (productId: string, changeQuantity: number): Promise<void> => {
  await axios.post("/shoppingcart", { productId, changeQuantity });
};

//PRODUCTS

export const getProducts = async (): Promise<ProductItem[]> => {
  return (await axios.get("/products")).data;
};

export const getProductById = async (id: string): Promise<ProductItem> => {
  return (await axios.get(`/products/id/${id}`)).data;
};

//USER

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

export const getUser = async (): Promise<AxiosResponse | any> => {
  try {
    return await axios.get("/users/me");
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const editUser = async (
  name: string,
  email: string,
  phoneNumber: string,
  deliveryAddress: object
): Promise<UserItem | null> => {
  try {
    return (
      await axios.patch(
        "/users/me",

        { name, email, phoneNumber, deliveryAddress }
      )
    ).data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

//CART
export const getCart = async (): Promise<CartItem> => {
  return (await axios.get("/shoppingcart")).data;
};

export const deleteCartItem = async (cartId: string, changeQuantity: number): Promise<void> => {
  await axios.patch("/shoppingcart", { cartId, changeQuantity });
};

export const purchase = async (): Promise<void> => {
  await axios.get("/shoppingcart/purchase");
};

//ORDERS

export const editProduct = async (id: string, form: FormData) => {
  await axios.patch(`products/id/${id}`, form);
};

export const getOrders = async (): Promise<OrderItem[]> => {
  return (await axios.get("/orders")).data as unknown as OrderItem[];
};

export const getAllOrders = async (): Promise<OrderItem[]> => {
  return (await axios.get("/orders/admin")).data as unknown as OrderItem[];
};

export const changeOrderStatus = async (cartId: string): Promise<void> => {
  await axios.patch("/orders/admin", cartId);
};

export const seachForProducts = async (
  search: string
): Promise<ProductItem[]> => {
  const res = await axios.get(`/products/search/${search}`);
  return res.data as ProductItem[];
};

export const addNewProduct = async (form: any): Promise<void> => {
  await axios.post("/products", form );
}

export const updateOrderStatus = async (cartId: string, status: string): Promise<any> => {
  return (await axios.patch(`/orders/${cartId}/admin`, {status})).data;
}
