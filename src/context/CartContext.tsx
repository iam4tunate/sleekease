// CartContext.tsx
import { ICartAction, ICartState } from '@/lib/types';
import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

const initialState: ICartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]') || [],
};

const CartContext = createContext<
  | {
      cart: ICartState;
      dispatch: React.Dispatch<ICartAction>;
    }
  | undefined
>(undefined);

const cartReducer = (cart: ICartState, action: ICartAction): ICartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = cart.items.find(
        (item) => item.$id === action.payload.$id
      );
      if (existingItem) {
        toast.message('Item already in cart');
        return cart;
      } else {
        toast.success('Item added to cart!');
        return { ...cart, items: [...cart.items, action.payload] };
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...cart,
        items: cart.items.filter((item) => item.$id !== action.payload),
      };
    case 'INCREASE_QUANTITY': {
      return {
        ...cart,
        items: cart.items.map((item) =>
          item.$id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    case 'DECREASE_QUANTITY': {
      return {
        ...cart,
        items: cart.items.map((item) =>
          item.$id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }
    default:
      return cart;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart.items));
  }, [cart.items]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
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
