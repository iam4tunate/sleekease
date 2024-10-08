import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  INewProduct,
  INewUser,
  IShippingInfo,
  IUpdateProduct,
  IWishlist,
} from '../types';
import {
  addShippingInfo,
  addToCart,
  createProduct,
  deleteFromCart,
  deleteProduct,
  deleteSaved,
  getCurrentUser,
  getProductbyId,
  getProductsByCategory,
  getRecentProducts,
  loginUser,
  logoutUser,
  registerUser,
  saveOrder,
  saveProduct,
  syncCartOnLogin,
  syncCartOnLogout,
  updateProduct,
  updateQuantity,
  updateShippingInfo,
} from '../appwrite/api';
import { toast } from 'sonner';
import { QUERY_KEYS } from './query-keys';

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (user: INewUser) => registerUser(user),
    onSuccess: () => {
      toast.success('Account created successfully!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => loginUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      toast.success('You are now logged in!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => logoutUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      toast.success('You are now logged out.');
    },
    onError: () => {
      toast.error('There was an issue logging you out. Please retry.');
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: INewProduct) => createProduct(product),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_PRODUCTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PRODUCT_BY_ID, data.$id],
      });
      toast.success('Item created successfully!');
    },
    onError: (error) => {
      toast(error.message);
    },
  });
};

export const useGetRecentProducts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_PRODUCTS],
    queryFn: getRecentProducts,
  });
};

export const useGetProductById = (productId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCT_BY_ID, productId],
    queryFn: () => getProductbyId(productId),
    enabled: !!productId,
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: IUpdateProduct) => updateProduct(product),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PRODUCT_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_PRODUCTS],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      productId,
      imageIds,
    }: {
      productId: string | undefined;
      imageIds: string[];
    }) => deleteProduct(productId ?? '', imageIds),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_PRODUCTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PRODUCT_BY_ID],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PRODUCTS_BY_CATEGORY],
      });
      toast.success('Item deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetProductByCategory = (category: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCTS_BY_CATEGORY, category],
    queryFn: () => getProductsByCategory(category),
    enabled: !!category,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      productId,
      user,
      size,
      quantity,
      title,
      price,
      imageUrl,
    }: {
      productId: string;
      user: string;
      size: string;
      quantity: number;
      title: string;
      price: number;
      imageUrl: string;
    }) => addToCart(productId, user, size, quantity, title, price, imageUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      toast.success('This piece is now in your cart!');
    },
    onError: (error) => {
      toast(error.message);
    },
  });
};

export const useDeleteFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (documentId: string) => deleteFromCart(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      toast.success('Item removed from your cart.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useSaveProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (savedItem: IWishlist) => saveProduct(savedItem),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      toast.success('Item added to your wishlist.');
    },
    onError: (error) => {
      toast(error.message);
    },
  });
};

export const useDeleteSaved = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ documentId }: { documentId: string }) =>
      deleteSaved(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      toast.success('Iitem removed from your wishlist.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateQuatity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      documentId,
      quantity,
    }: {
      documentId: string;
      quantity: number;
    }) => updateQuantity(documentId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
    onError: (error) => {
      toast(error.message);
    },
  });
};

export const useSyncCartOnLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => syncCartOnLogin(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
    onError: (error) => {
      toast(error.message);
    },
  });
};

export const useSyncCartOnLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => syncCartOnLogout(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
    onError: (error) => {
      toast(error.message);
    },
  });
};

export const useAddToRecentlyViewed = () => {};

export const useAddShippingInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (shipping: IShippingInfo) => addShippingInfo(shipping),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      toast.success('Your shipping info has been saved!');
    },
    onError: (error) => {
      toast(error.message);
    },
  });
};

export const useUpdateShippingInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      documentId,
      shipping,
    }: {
      documentId: string;
      shipping: IShippingInfo;
    }) => updateShippingInfo(documentId, shipping),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      toast.success('Shipping details updated!');
    },
    onError: (error) => {
      toast(error.message);
    },
  });
};

export const useSaveOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      productIds,
      userId,
      shippingId,
    }: {
      productIds: string;
      userId: string;
      shippingId: string;
    }) => saveOrder(productIds, userId, shippingId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
    onError: (error) => {
      toast(error.message);
    },
  });
};
