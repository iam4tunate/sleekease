'use client';
import { NavLinks } from '@/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className='bg-white rounded-sm shadow'>
      <ul className=''>
        {NavLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`first:rounded-t-sm px-3 flex items-center gap-x-4 py-4 ${
              pathname === link.href ? 'bg-gray-200 font-poppinsMedium' : ''
            }`}>
            <link.icon size={20} />
            <span>{link.name}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
}
