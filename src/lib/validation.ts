import { z } from 'zod';

export const registerValidation = z.object({
  firstName: z.string().min(1, { message: 'Field is required' }),
  lastName: z.string().min(1, { message: 'Field is required' }),
  email: z.string().email(),
  password: z.string().min(8, { message: 'Minimum of 8 characters' }),
});

export const LoginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Field is required' }),
});

export const ProductValidation = z.object({
  title: z.string().min(1, 'title is required'),
  price: z.number().min(1, 'price is required'),
  discount: z.number().optional(),
  category: z.string().min(1, 'select a category'),
  description: z.string().min(1, 'description is required'),
  features: z.string().min(1, 'features is required'),
  sizes: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'select a size.',
  }),
  files: z.custom<File[]>(),
  //!issue with this is that you have to upload a new file when you want to upload
  // files: z.array(z.instanceof(File)).min(1, "At least one file is required"),
});

export const CartValidation = z.object({
  type: z.enum(['x-small', 'small', 'medium', 'large', 'x-large'], {
    required_error: 'select your preferred size.',
  }),
});
