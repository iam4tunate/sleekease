'use client';
import Link from 'next/link';
import { CircleUserRound, Logs, Search, ShoppingBag } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className=''>
      <div className='bg-gray-100'>
        <div className='container padX py-3 text-sm max-sm:text-xs font-poppinsMedium flex flex-wrap gap-x-6 gap-y-1.5 items-center justify-between'>
          <p className=''>Welcome to our store</p>
          <p className='flex items-center gap-x-4 max-sm:gap-x-3'>
            Log in{' '}
            <span className='h-3.5 w-[1.5px] bg-dark inline-block'></span>
            Create account
          </p>
        </div>
      </div>
      <div className='container padX py-4 w-full'>
        <div className='grid grid-cols-[20%_50%_30%] max-lg:grid-cols-[15%_60%_15%] max-md:flex max-md:gap-x-4 items-center justify-between'>
          <Link href='/'>
            <div className='font-lora uppercase font-bold text-lg'>
              Sleekease.
            </div>
          </Link>
          <div className='w-full flex items-center max-md:ml-auto max-md:w-fit rounded-md'>
            <Link
              href='/category'
              className='flex items-center gap-x-1 bg-gray-100 h-10 rounded-sm px-4 max-sm:hidden'>
              <Logs size={20} />
              <span className='text-sm max-md:text-[13px] font-poppinsMedium'>
                Categories
              </span>
            </Link>
            <div className='w-full flex items-center max-md:hidden'>
              <input
                type='text'
                className='border border-[#0000002d] outline-none h-[39px] w-full bg-transparent'
              />
              <button className='h-10 px-5 rounded-tr-md rounded-br-md bg-primary text-white'>
                <Search size={20} />
              </button>
            </div>
            <Logs size={25} className='hidden max-sm:flex' />
            <Search size={23} className='hidden max-md:flex ml-4 ' />
          </div>
          <div className='flex items-center gap-x-4 justify-self-end'>
            <CircleUserRound size={23} />
            <Link
              href='/cart'
              className='flex items-end gap-x-1 cursor-pointer'>
              <span className='relative'>
                <ShoppingBag size={20} />
                <span className='bg-primary text-white px-[5px] py-[.5px] rounded-full border border-white absolute -top-2 -right-2 text-[10px] font-bold'>
                  4
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
