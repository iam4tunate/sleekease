import {
  ArrowLeftRight,
  Heart,
  History,
  List,
  Package2,
  PackagePlus,
  User,
} from 'lucide-react';
import {
  GiArmoredPants,
  GiBilledCap,
  GiHoodie,
  GiMonclerJacket,
} from 'react-icons/gi';
import { RiShirtFill } from 'react-icons/ri';
import { IoShirt } from 'react-icons/io5';

export const DashboardNav = [
  { name: 'My Account', href: '/customer/overview', icon: User },
  { name: 'Orders', href: '/customer/orders', icon: Package2 },
  { name: 'Wishlist', href: '/customer/wishlist', icon: Heart },
  { name: 'Recently Viewed', href: '/customer/recently-viewed', icon: History },
];

export const AdminDashboardNav = [
  { name: 'Create Product', href: '/admin/create', icon: PackagePlus },
  { name: 'Product List', href: '/admin/list', icon: List },
];

export const CategoryNav = [
  { label: 't-shirts', icon: RiShirtFill },
  { label: 'pants', icon: GiArmoredPants },
  { label: 'shirts', icon: IoShirt },
  { label: 'caps', icon: GiBilledCap },
  { label: 'jackets', icon: GiMonclerJacket },
  { label: 'sweatshirts', icon: GiHoodie },
];

export const AccountStats = [
  { name: 'orders', value: 10, icon: Package2 },
  { name: 'successful transactions', value: 10, icon: ArrowLeftRight },
  { name: 'wishlist', value: 4, icon: Heart },
  { name: 'Recently Viewed', value: 50, icon: History },
];

export const SizesOptions = ['x-small', 'small', 'medium', 'large', 'x-large'];

export const HomeCarousel = [
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
  '/images/5.png',
  '/images/6.jpg',
];
