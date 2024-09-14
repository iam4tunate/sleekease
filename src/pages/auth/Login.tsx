import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUserContext } from '@/context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/shared';
import { useLoginUser } from '@/lib/react-query/queries';
import { useEffect } from 'react';
import { LoginValidation } from '@/lib/validation';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkAuthUser, isAuthenticated } = useUserContext();

  const from = location.state?.from?.pathname || '/';

  const { mutateAsync: login, isPending: loggingIn } = useLoginUser();

  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof LoginValidation>) {
    await login({
      email: values.email,
      password: values.password,
    });

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate(from, { replace: true });
    }
  }
  // TODO: MERGE AT LOGIN
  // useMergeCartOnLogin(user.id);

  //! redirecting to the homepage if user already logged in
  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [navigate, isAuthenticated, from]);

  return (
    <div className='grid grid-cols-2 max-lg:grid-cols-1 items-start gap-x-12 container padY'>
      <div className='flex flex-col items-center justify-center w-[90%] max-lg:w-[70%] max-sm:w-full mx-auto'>
        <div className='w-[70%] max-sm:w-[90%] text-center pb-6 space-y-1'>
          <div className='font-lora text-3xl max-sm:text-3xl'>
            Your Style Awaits.
          </div>
          <p>
            Log in to unlock the latest trends, curated just for you. Your
            fashion journey continues here.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-5'>
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
            <Button type='submit' className='w-full'>
              {loggingIn ? (
                <>
                  <Spinner size={20} />
                  <span className='pl-1'>Please wait...</span>
                </>
              ) : (
                'Log In and Elevate Your Look'
              )}
            </Button>
          </form>
        </Form>
        <p className='pt-3 px-3 text-left self-start'>
          New to SLEEKEASE?
          <Link
            to='/register'
            className='font-rubikMedium text-orange pl-1.5 pr-0.5 underline'>
            Register Now
          </Link>{' '}
          for exclusive top styles.
        </p>
      </div>
      <div className='relative max-lg:hidden rounded-2xl h-full'>
        <div className='bg-black absolute top-0 bottom-0 w-full bg-opacity-20 rounded-2xl' />
        <img
          src='/images/authBG2.jpg'
          alt='banner'
          className='h-full w-full object-cover rounded-2xl'
        />
      </div>
    </div>
  );
}
