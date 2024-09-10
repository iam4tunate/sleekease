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
