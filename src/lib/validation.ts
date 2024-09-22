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
});

export const CartValidation = z.object({
  type: z.enum(['x-small', 'small', 'medium', 'large', 'x-large'], {
    required_error: 'select your preferred size.',
  }),
});

export const ShippingValidation = z.object({
  email: z.string().min(1, {
    message: 'Email is required.',
  }),
  phoneNumber: z.string().min(1, {
    message: 'Phone number is required',
  }),
  firstName: z.string().min(1, {
    message: 'First name is required',
  }),
  lastName: z.string().min(1, {
    message: 'Last name is required',
  }),
  streetAddress: z.string().min(1, {
    message: 'Street address is required',
  }),
  state: z.string().min(1, {
    message: 'State is required',
  }),
  lga: z.string().min(1, {
    message: 'LGA is required',
  }),
  zipCode: z
    .string()
    .max(9, {
      message: 'Maximum of 9 characters',
    })
    .optional(),
});

export const CheckoutValidation = z.object({
  noRefund: z.boolean().refine((val) => val === true, {
    message: 'Please accept the policy to proceed.',
  }),
});
