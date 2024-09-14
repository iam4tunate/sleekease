export type INewUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type IUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  label: string;
};

export type INewProduct = {
  userId: string;
  title: string;
  category: string;
  price: number;
  discount?: number;
  description: string;
  features: string;
  sizes: string[];
  files: File[];
};

export type IUpdateProduct = {
  productId: string;
  title: string;
  category: string;
  price: number;
  discount?: number;
  description: string;
  features: string;
  sizes: string[];
  files: File[];
  imageIds: string[];
  imageUrls: string[];
};

export type ICartItem = {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
};
