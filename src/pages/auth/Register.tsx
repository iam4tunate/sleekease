import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLoginUser, useRegisterUser } from '@/lib/react-query/queries';
import { useUserContext } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { registerValidation } from '@/lib/validation';
import { SubmitButton } from '@/components/shared';

export default function Register() {
  const navigate = useNavigate();
  const { checkAuthUser, isAuthenticated } = useUserContext();

  const { mutateAsync: register, isPending: registering } = useRegisterUser();
  const { mutateAsync: login, isPending: loggingIn } = useLoginUser();

  const form = useForm<z.infer<typeof registerValidation>>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof registerValidation>) {
    await register(values);

    await login({
      email: values.email,
      password: values.password,
    });

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate('/');
    }
  }

  //! redirecting to the homepage if user already logged in
  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [navigate, isAuthenticated]);

  return (
    <div className='grid grid-cols-2 max-lg:grid-cols-1 items-center gap-x-12 container min-h-[30rem] padY'>
      <div className='w-[90%] flex flex-col items-center justify-center max-lg:w-[80%] max-sm:w-full mx-auto'>
        <div className='w-[90%] text-center pb-6 space-y-1'>
          <div className='font-lora text-3xl max-sm:text-2xl'>
            Get Ready to Redefine Your Wardrobe.
          </div>
          <p>
            Create your account today and enjoy personalized fashion
            recommendations, early access to sales, and so much more.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-5'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton
              text='Sign Up and Start Styling'
              isLoading={registering || loggingIn}
              className='rounded-full w-full'
            />
          </form>
        </Form>
        <p className='pt-3 px-3 text-left self-start'>
          Already have an account?
          <Link
            to='/login'
            className='underline font-rubikMedium text-orange pl-1.5 pr-0.5'>
            Log in{' '}
          </Link>{' '}
          here to stay sleek.
        </p>
      </div>
      <div className='relative max-lg:hidden rounded-2xl h-full'>
        <div className='bg-black absolute top-0 bottom-0 w-full bg-opacity-20 rounded-2xl' />
        <img
          src='/images/authBg1.jpg'
          alt='cloth store'
          className='h-full w-full object-cover rounded-2xl'
        />
      </div>
    </div>
  );
}
