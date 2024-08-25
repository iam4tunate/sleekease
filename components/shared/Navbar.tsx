'use client';
import Link from 'next/link';
import {
  CircleUserRound,
  Heart,
  LogOut,
  Logs,
  Package2,
  ShoppingBag,
  User,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import {
  GiArmoredPants,
  GiBilledCap,
  GiHoodie,
  GiMonclerJacket,
} from 'react-icons/gi';
import { IoShirt } from 'react-icons/io5';
import { TbJacket } from 'react-icons/tb';

export default function Navbar() {
  return (
    <nav className='shadow-sm'>
      <div className='bg-gray-100'>
        <div className='container padX py-4 text-sm max-sm:text-xs font-poppinsMedium flex flex-wrap gap-x-6 gap-y-1.5 items-center justify-between'>
          <p className=''>Welcome to our store</p>
          <div className='flex items-center gap-x-4 max-sm:gap-x-3'>
            <Link href='/auth/login'>Log in</Link>
            <span className='h-3.5 w-[1.5px] bg-dark inline-block'></span>
            <Link href='/auth/register'>Create account</Link>
          </div>
        </div>
      </div>
      <div className='container padX py-4 w-full'>
        <div className='flex items-center justify-between'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='flex items-center gap-x-1 bg-gray-100 py-2 rounded-sm px-4 max-sm:px-2 cursor-pointer'>
                <Logs size={20} className='' />
                <span className='text-sm font-poppinsMedium max-sm:hidden'>
                  Categories
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-44'>
              <DropdownMenuLabel className='hidden max-sm:flex'>
                Categories
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className='space-y-1'>
                <Link href='/shop/hoodies'>
                  <DropdownMenuItem>
                    <GiHoodie className='mr-2 h-4 w-4' />
                    <span>Hoodies</span>
                  </DropdownMenuItem>
                </Link>
                <Link href='/shop/t-shirts'>
                  <DropdownMenuItem>
                    <GiMonclerJacket className='mr-2 h-4 w-4' />
                    <span>T-shirt</span>
                  </DropdownMenuItem>
                </Link>
                <Link href='/shop/jackets'>
                  <DropdownMenuItem>
                    <TbJacket className='mr-2 h-4 w-4' />
                    <span>Jackets</span>
                  </DropdownMenuItem>
                </Link>
                <Link href='/shop/shirts'>
                  <DropdownMenuItem>
                    <IoShirt className='mr-2 h-4 w-4' />
                    <span>Shirt</span>
                  </DropdownMenuItem>
                </Link>
                <Link href='/shop/pants'>
                  <DropdownMenuItem>
                    <GiArmoredPants className='mr-2 h-4 w-4' />
                    <span>Pants</span>
                  </DropdownMenuItem>
                </Link>
                <Link href='/shop/caps'>
                  <DropdownMenuItem>
                    <GiBilledCap className='mr-2 h-4 w-4' />
                    <span>Caps</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href='/'>
            <div className='font-lora uppercase font-black text-lg lg:text-xl italic'>
              Sleekease.
            </div>
          </Link>

          <div className='flex items-center gap-x-5 max-sm:gap-x-4'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <CircleUserRound size={23} className='cursor-pointer' />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-44'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className='space-y-0.5'>
                  <Link href='/customer/overview'>
                    <DropdownMenuItem>
                      <User className='mr-2 h-4 w-4' />
                      <span>Overview</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href='/customer/orders'>
                    <DropdownMenuItem>
                      <Package2 className='mr-2 h-4 w-4' />
                      <span>Orders</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href='/customer/saved'>
                    <DropdownMenuItem>
                      <Heart className='mr-2 h-4 w-4' />
                      <span>Saved Items</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='bg-red-50 mt-1.5'>
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href='/shopping-bag'
              className='flex items-end gap-x-1 cursor-pointer'>
              <span className='relative'>
                <ShoppingBag size={20} />
                <span className='bg-primary text-white h-5 w-5 flex items-center justify-center rounded-full border border-white absolute -top-3 -right-2 text-[10px] font-bold'>
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
