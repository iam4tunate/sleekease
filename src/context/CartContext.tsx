// CartContext.tsx
import { ICartAction, ICartItem } from '@/lib/types';
import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

const initialState: ICartItem[] =
  JSON.parse(localStorage.getItem('cart') || '[]') || [];

const CartContext = createContext<
  | {
      localCart: ICartItem[];
      dispatch: React.Dispatch<ICartAction>;
    }
  | undefined
>(undefined);

const cartReducer = (
  localCart: ICartItem[],
  action: ICartAction
): ICartItem[] => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = localCart.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        toast.message('This piece is already in your cart.');
        return localCart;
      } else {
        toast.success('Item added to your cart.');
        return [...localCart, action.payload];
      }
    }
    case 'REMOVE_ITEM':
      return localCart.filter((item) => item.productId !== action.payload);
    case 'INCREASE_QUANTITY': {
      return localCart.map((item) =>
        item.productId === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    case 'DECREASE_QUANTITY': {
      return localCart.map((item) =>
        item.productId === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
    default:
      return localCart;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [localCart, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(localCart));
  }, [localCart]);

  return (
    <CartContext.Provider value={{ localCart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
