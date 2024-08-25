import {
  ArrowLeftRight,
  Heart,
  History,
  Package2,
  User,
} from 'lucide-react';

export const NavLinks = [
  { name: 'My Account', href: '/customer/overview', icon: User },
  { name: 'Orders', href: '/customer/orders', icon: Package2 },
  { name: 'Saved Items', href: '/customer/saved', icon: Heart },
  { name: 'Recently Viewed', href: '/customer/recently-viewed', icon: History },
];

export const AccountStats = [
  { name: 'orders', value: 10, icon: Package2 },
  { name: 'successful transactions', value: 10, icon: ArrowLeftRight },
  { name: 'saved items', value: 4, icon: Heart },
  { name: 'Recently Viewed', value: 50, icon: History },
];
