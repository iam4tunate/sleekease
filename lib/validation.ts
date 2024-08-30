import { z } from 'zod';

export const SignupValidation = z.object({
  first_name: z.string().min(1, {
    message: 'Field is required.',
  }),
  last_name: z.string().min(1, {
    message: 'Field is required.',
  }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});
