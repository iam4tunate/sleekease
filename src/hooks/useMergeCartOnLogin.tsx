// import { useUserContext } from '@/context/AuthContext';
// import { useCart } from '@/context/CartContext';
// import { useAddToCart, useGetCart } from '@/lib/react-query/queries';
// import { ICartItem } from '@/lib/types';
// import { useEffect } from 'react';

// const useMergeCartOnLogin = (userId: string | null) => {
//   const { state, dispatch } = useCart();
//   const { user } = useUserContext();
//   const { data: cartItems } = useGetCart(user.id);
//   const { mutateAsync: addToCart } = useAddToCart();

//   useEffect(() => {
//     const mergeCart = async () => {
//       if (!userId) return;

//       // Get guest cart from localStorage
//       const guestCart = JSON.parse(localStorage.getItem('cart') || '[]');

//       // Merge guest cart and user cart
//       const mergedCart = [...guestCart, ...cartItems].reduce((acc, item) => {
//         const existingItem = acc.find(
//           (cartItem: ICartItem) => cartItem.id === item.id
//         );
//         if (existingItem) {
//           existingItem.quantity += item.quantity;
//         } else {
//           acc.push(item);
//         }
//         return acc;
//       }, [] as ICartItem[]);

//       // Update cart in global state
//       dispatch({ type: 'SET_CART', payload: mergedCart });

//       // Save the merged cart to Appwrite
//       await addToCart({ userId, mergedCart });

//       // Clear localStorage guest cart
//       localStorage.removeItem('cart');
//     };

//     // Call the mergeCart function when userId is present (user is logged in)
//     mergeCart();
//   }, [userId, addToCart, cartItems, dispatch]); // Only run when userId changes (login happens)
// };

// export default useMergeCartOnLogin;
