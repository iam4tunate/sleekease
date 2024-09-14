// import { useCart } from '@/context/CartContext';
// import { useEffect } from 'react';

// const useGuestCart = () => {
//   const { state, dispatch } = useCart();

//   // Load cart from localStorage on component mount
//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
//     }
//   }, [dispatch]);

//   // Save cart to localStorage whenever the cart changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(state.cart));
//   }, [state.cart]);

//   return state.cart;
// };

// export default useGuestCart;
