type Adress = {
  streetName: string;
  streetNumber: number;
  county: string;
  postalCode: number;
};

export interface UserItem {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  roles: ("customer" | "admin")[];
  deliveryAddress?: Adress;
}
