import {
  BadgeCheck,
  CircleUserRound,
  Heart,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CategoryNav } from '@/lib/constants';
import { useUserContext } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import {
  useGetCurrentUser,
  useLogoutUser,
  useSyncCartOnLogin,
} from '@/lib/react-query/queries';
import { useEffect, useState } from 'react';
import { useCartContext } from '@/context/CartContext';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '../ui/scroll-area';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import CartSummary from './CartSummary';
import { Models } from 'appwrite';
import CartItem from './CartItem';
import { ICartItem } from '@/lib/types';
import { toast } from 'sonner';

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isSheetOpen, setSheetOpen] = useState<boolean>(false);
  const { isAuthenticated, userLoading, user } = useUserContext();
  const { mutateAsync: logout, isSuccess } = useLogoutUser();
  const { mutateAsync: syncOnLogin } = useSyncCartOnLogin();

  const { localCart } = useCartContext();
  const { data: currentUser, isPending: isLoading } = useGetCurrentUser();
  const appwriteCart = currentUser?.cart || null;
  console.log(user);
  //filtered appwrite cart length
  const appwriteCartLength =
    appwriteCart?.filter((item: Models.Document) => !item.isDeleted).length ||
    null;
  const localCartLength = localCart?.length || null;

  const appwriteCartItems = appwriteCart
    ?.slice()
    .reverse()
    .filter((item: Models.Document) => !item.isDeleted)
    .map((item: Models.Document) => (
      <CartItem
        toggleSheet={setSheetOpen}
        key={item.$id}
        appwriteCartItem={item}
      />
    ));

  const localCartItems = localCart
    ?.slice()
    .reverse()
    .map((item: ICartItem) => (
      <CartItem
        toggleSheet={setSheetOpen}
        key={item.productId}
        localCartItem={item}
      />
    ));

  // Move all items from local storage cart to appwrite on login
  useEffect(() => {
    const runOnLogin = async () => {
      if (user?.id) {
        await syncOnLogin(user?.id);
      }
    };
    runOnLogin();
  }, [syncOnLogin, user?.id]);

  const handleLogout = async () => {
    if (user?.id) {
      await logout(user.id);
    } else {
      toast.error('User is not logged in or ID is undefined');
    }
  };

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [navigate, isSuccess]);

  return (
    <nav className='shadow-sm fixed top-0 left-0 right-0 z-50'>
      <div
        className={cn(
          'bg-gray-100',
          isAuthenticated && !userLoading && 'hidden'
        )}>
        <div className='container padX h-12 flex flex-wrap gap-x-6 items-center justify-between'>
          <p className='font-rubikMedium'>Welcome to our store</p>
          <div className='flex items-center gap-x-4 max-sm:gap-x-3'>
            <Link to='/login'>Log in</Link>
            <span className='h-3.5 w-[1.5px] bg-primary inline-block'></span>
            <Link to='/register' className='max-[370px]:hidden'>
              Create account
            </Link>
            <Link to='/register' className='hidden max-[370px]:flex'>
              Register
            </Link>
          </div>
        </div>
      </div>
      <div className='bg-white'>
        <div className='h-14 flex items-center justify-between container padX'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='flex items-center gap-x-1 bg-gray-100 py-2 rounded-sm px-4 max-sm:px-2 cursor-pointer'>
                <Logs size={20} className='' />
                <span className='font-rubikMedium max-sm:hidden'>
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
                {CategoryNav.map((nav) => (
                  <Link key={nav.label} to={`/category/${nav.label}`}>
                    <DropdownMenuItem>
                      <nav.icon className='mr-2 h-4 w-4' />
                      <span className='capitalize'>{nav.label}</span>
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to='/'>
            <div className='uppercase font-rubikBold text-lg lg:text-xl italic'>
              Sleekease.
            </div>
          </Link>

          <div className='flex items-center gap-x-6'>
            <Link
              to='/shop'
              className='border rounded-full px-4 py-1.5 hover:bg-gray-100 max-md:hidden'>
              Shop All Styles
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='relative cursor-pointer'>
                  <CircleUserRound size={26} />
                  <BadgeCheck
                    size={19}
                    fill='green'
                    color='white'
                    className={cn(
                      'absolute -bottom-1 -right-2',
                      !isAuthenticated && !userLoading && 'hidden'
                    )}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-44'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup className='space-y-0.5'>
                  <Link to='/customer/overview'>
                    <DropdownMenuItem>
                      <User className='mr-2 h-4 w-4' />
                      <span>Account</span>
                    </DropdownMenuItem>
                  </Link>{' '}
                  <Link to='/customer/orders'>
                    <DropdownMenuItem>
                      <Package2 className='mr-2 h-4 w-4' />
                      <span>Orders</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link to='/customer/wishlist'>
                    <DropdownMenuItem>
                      <Heart className='mr-2 h-4 w-4' />
                      <span>Wishlist</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {isAuthenticated && (
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className='w-fit mx-auto text-[13px] px-2 bg-red-50 mt-1.5 cursor-pointer'>
                    <span>Log out</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger>
                <div className='flex items-end gap-x-1 cursor-pointer max-md:hidden'>
                  <span className='relative'>
                    <ShoppingBag size={23} />
                    {(appwriteCartLength || localCartLength) && (
                      <span className='bg-primary text-white h-5 w-5 flex items-center justify-center rounded-full border border-white absolute -top-2 -right-2 text-[10px] font-rubikSemibold'>
                        {appwriteCartLength ?? localCartLength}
                      </span>
                    )}
                  </span>
                </div>
              </SheetTrigger>
              <SheetContent
                className={cn(
                  'max-sm:min-w-full max-xl:min-w-[50%] max-lg:min-w-[60%] max-md:min-w-[70%] min-w-[40%] overflow-y-auto remove-scrollbar',
                  isAuthenticated && !isLoading ? 'mt-[56px]' : 'mt-[104px]'
                )}>
                <SheetHeader>
                  <SheetTitle>
                    <div className='heading'>Your Cart</div>
                  </SheetTitle>
                </SheetHeader>

                <div className='flex flex-col gap-y-4 h-full'>
                  <ScrollArea className='max-h-[50vh] w-full h-auto rounded-md border p-4'>
                    {isLoading && currentUser ? (
                      Array.from({ length: 2 }, (_, index) => (
                        <div
                          key={index}
                          className='h-28 max-[400px]:h-full flex max-[400px]:flex-col items-start justify-between pb-5 mb-5 max-sm:pb-8 last-of-type:pb-0 last-of-type:mb-0'>
                          <div className='flex gap-x-4'>
                            <Skeleton className='w-36 h-28 max-sm:w-24' />
                            <div className='flex flex-col gap-y-2.5 w-full'>
                              <Skeleton className='h-5 w-26' />
                              <Skeleton className='h-4 w-16' />
                              <Skeleton className='h-8 w-20' />
                            </div>
                          </div>
                          <div className='h-full max-[400px]:w-full flex flex-col justify-between items-end max-[400px]:flex-row max-[400px]:justify-between text-right'>
                            <Skeleton className='h-5 w-24 max-sm:w-16' />
                            <div className='flex items-center gap-x-4'>
                              <Skeleton className='h-8 w-8 rounded-full' />
                              <Skeleton className='h-8 w-8 rounded-full' />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (currentUser && !isLoading && !appwriteCartLength) ||
                      (!currentUser && !localCartLength) ? (
                      <div className='flex flex-col items-center justify-center'>
                        <img
                          src='/images/empty-bag.png'
                          alt='shopping bag'
                          className='w-[8rem]'
                        />
                        <div className='font-rubikMedium text-lg'>
                          Your cart is empty
                        </div>
                        <p className='pt-1 pb-4 text-center'>
                          Add some items to get started.
                        </p>
                        <SheetClose asChild>
                          <Button type='button' asChild>
                            <Link to='/shop'>Shop Now</Link>
                          </Button>
                        </SheetClose>
                      </div>
                    ) : (
                      appwriteCartItems ?? localCartItems
                    )}
                  </ScrollArea>
                  <div className=''>
                    <CartSummary />
                    <div className={pathname === '/checkout' ? 'hidden' : ''}>
                      {currentUser ? (
                        <SheetClose asChild>
                          <Button
                            onClick={() => navigate('/checkout')}
                            disabled={!appwriteCartLength}
                            className='py-2.5 bg-primary text-white rounded-full w-full mt-3.5'>
                            Proceed to Checkout
                          </Button>
                        </SheetClose>
                      ) : (
                        <SheetClose asChild>
                          <Button
                            onClick={() => navigate('/checkout')}
                            className='py-2.5 bg-primary text-white rounded-full w-full mt-3.5'>
                            Login to Checkout
                          </Button>
                        </SheetClose>
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
