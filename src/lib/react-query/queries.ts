import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { INewProduct, INewUser, IUpdateProduct } from '../types';
import {
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
  saveProduct,
  updateProduct,
  updateQuantity,
} from '../appwrite/api';
import { toast } from 'sonner';
import { QUERY_KEYS } from './query-keys';

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (user: INewUser) => registerUser(user),
    onSuccess: () => {
      toast.success('Registeration successful.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => loginUser(user),
    onSuccess: () => {
      toast.success('Logged in successfully.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      toast.success('Logged out successfully.');
    },
    onError: () => {
      toast.success('Unable to log out, please try again.');
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
      toast.success('Product created successfully.');
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
      toast.success('Product deleted successfully');
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
      userId,
      size,
      quantity,
    }: {
      productId: string;
      userId: string;
      size: string;
      quantity: number;
    }) => addToCart(productId, userId, size, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      toast.success('Product added to cart.');
    },
    onError: (error) => {
      toast(error.message);
    },
  });
};

export const useDeleteFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ documentId }: { documentId: string }) =>
      deleteFromCart(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      toast.success('Product removed from cart');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useSaveProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => saveProduct(productId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      toast.success('Product saved sucessfully.');
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
      toast.success('Product removed from your saved list');
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
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PRODUCT_BY_ID],
      });
    },
    onError: (error) => {
      toast(error.message);
    },
  });
};
