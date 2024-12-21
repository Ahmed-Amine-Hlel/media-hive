'use client';

import Link from 'next/link';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { FaChartBar, FaUser } from 'react-icons/fa6';
import { MdMovieFilter } from 'react-icons/md';
import useUser from '@/hooks/user/useUser';
import { Button } from '@/components/ui/button';
import { GrList } from 'react-icons/gr';

interface NavItem {
  name: string;
  href: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/dashboard', icon: <FiHome /> },
  { name: 'Movies', href: '/dashboard/movies', icon: <MdMovieFilter /> },
  { name: 'Actors', href: '/dashboard/actors', icon: <FaUser /> },
  { name: 'Genres', href: '/dashboard/genres', icon: <GrList /> },
  { name: 'Analytics', href: '/dashboard/analytics', icon: <FaChartBar /> },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { logout } = useUser();

  return (
    <div className="flex flex-col h-screen w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-xl">
      <div className="flex items-center justify-center py-4 border-b border-gray-700">
        <div className="flex-shrink-0 text-center font-semibold">MediaHive</div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors group ${
              pathname === item.href
                ? 'bg-gray-700 text-gray-200'
                : 'hover:bg-gray-700 hover:text-gray-300 text-gray-400'
            }`}
          >
            <span
              className={`text-xl mr-4 ${
                pathname === item.href
                  ? 'text-gray-200'
                  : 'text-gray-400 group-hover:text-gray-200'
              }`}
            >
              {item.icon}
            </span>
            <span className="text-base font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="px-4 py-6 border-t border-gray-700">
        <Button
          className="flex items-center justify-center w-full bg-teal-700 hover:bg-teal-800 text-white rounded-lg transition-colors group"
          onClick={logout}
        >
          <FiLogOut className="text-xl mr-0.5 text-white group-hover:text-gray-200" />
          <span className="text-sm font-medium">Log Out</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
