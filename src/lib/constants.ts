import {
  ArrowLeftRight,
  CirclePlus,
  Heart,
  History,
  Package2,
  User,
} from 'lucide-react';
import {
  GiArmoredPants,
  GiBilledCap,
  GiHoodie,
  GiMonclerJacket,
} from 'react-icons/gi';
import { IoShirt } from 'react-icons/io5';
import { TbJacket } from 'react-icons/tb';

export const DashboardNav = [
  { name: 'My Account', href: '/customer/overview', icon: User },
  { name: 'Orders', href: '/customer/orders', icon: Package2 },
  { name: 'Saved Items', href: '/customer/saved', icon: Heart },
  { name: 'Recently Viewed', href: '/customer/recently-viewed', icon: History },
  { name: 'Create Item', href: '/admin/create', icon: CirclePlus },
];

export const CategoryNav = [
  { name: 'Hoodies', href: '/category/hoodies', icon: GiHoodie },
  { name: 'T-shirts', href: '/category/t-shirts', icon: GiMonclerJacket },
  { name: 'Jackets', href: '/category/jackets', icon: TbJacket },
  { name: 'Shirts', href: '/category/shirts', icon: IoShirt },
  { name: 'Pants', href: '/category/pants', icon: GiArmoredPants },
  { name: 'Caps', href: '/category/caps', icon: GiBilledCap },
];

export const AccountStats = [
  { name: 'orders', value: 10, icon: Package2 },
  { name: 'successful transactions', value: 10, icon: ArrowLeftRight },
  { name: 'saved items', value: 4, icon: Heart },
  { name: 'Recently Viewed', value: 50, icon: History },
];
