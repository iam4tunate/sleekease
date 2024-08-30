'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import BG from '@/public/images/authBg1.jpg';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SigninValidation } from '@/lib/validation';
import Spinner from '@/components/shared/Spinner';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const isLoggingIn = false;
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    console.log(values);
  }

  return (
    <div className='grid grid-cols-2 max-lg:grid-cols-1 items-center gap-x-12 container min-h-[30rem] padY'>
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
              {isLoggingIn ? (
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
            href='/register'
            className='font-rubikMedium text-orange pl-1.5 pr-0.5 underline'>
            Register Now
          </Link>{' '}
          for exclusive fashion deals and top styles.
        </p>
      </div>
      <div className='relative max-lg:hidden rounded-2xl min-h-[30rem]'>
        <Image
          fill
          src={BG}
          alt='banner'
          placeholder='blur'
          className='h-full w-full object-cover rounded-2xl'
        />
      </div>
    </div>
  );
}
