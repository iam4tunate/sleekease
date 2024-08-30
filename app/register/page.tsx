'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import BG from '@/public/images/authBG2.jpg';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SignupValidation } from '@/lib/validation';
import Spinner from '@/components/shared/Spinner';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const isCreating = false;

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    console.log(values);
  }

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
              name='first_name'
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
              name='last_name'
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
            <Button type='submit' className='w-full'>
              {isCreating ? (
                <>
                  <Spinner size={20} />
                  <span className='pl-1'>Please wait...</span>
                </>
              ) : (
                'Sign Up and Start Styling'
              )}
            </Button>
          </form>
        </Form>
        <p className='pt-3 px-3 text-left self-start'>
          Already have an account?
          <Link
            href='/login'
            className='underline font-rubikMedium text-orange pl-1.5 pr-0.5'>
            Log in{' '}
          </Link>{' '}
          here to stay sleek.
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
