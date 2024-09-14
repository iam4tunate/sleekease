// import React, { createContext, useContext, useReducer, ReactNode } from 'react';
// TODO: Fix guest state for saving and adding to cart with the hooks also
// // Define the Cart item type
// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// // Define the shape of the CartContext
// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: string) => void;
// }

// // Create the CartContext with default values
// const CartContext = createContext<CartContextType | undefined>(undefined);

// // Reducer function to manage the cart state
// const cartReducer = (state: CartItem[], action: any) => {
//   switch (action.type) {
//     case 'ADD_TO_CART':
//       return [...state, action.payload];
//     case 'REMOVE_FROM_CART':
//       return state.filter(item => item.id !== action.payload);
//     default:
//       return state;
//   }
// };

// // Provide the CartContext to components
// export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [cart, dispatch] = useReducer(cartReducer, []);

//   const addToCart = (item: CartItem) => {
//     dispatch({ type: 'ADD_TO_CART', payload: item });
//   };

//   const removeFromCart = (id: string) => {
//     dispatch({ type: 'REMOVE_FROM_CART', payload: id });
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Hook to use the CartContext
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };
