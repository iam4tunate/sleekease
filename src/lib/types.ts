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

export interface ICartItem {
  $id: string;
  title: string;
  price: number;
  quantity: number;
  size: string;
  imageUrls: string[];
}

export type ICartAction =
  | { type: 'ADD_ITEM'; payload: ICartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'INCREASE_QUANTITY'; payload: string }
  | { type: 'DECREASE_QUANTITY'; payload: string };

export interface ICartState {
  items: ICartItem[];
}

export type IRecenltyViewed = {
  id: string;
  title: string;
  price: string;
  image: string;
};
