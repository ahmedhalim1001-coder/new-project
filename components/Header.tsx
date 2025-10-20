import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Bars3Icon from './icons/Bars3Icon';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const auth = useAuth();

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button 
            onClick={toggleSidebar} 
            className="text-gray-600 focus:outline-none md:hidden"
            aria-label="Toggle sidebar"
        >
            <Bars3Icon className="h-6 w-6" />
        </button>
      </div>
      <div className="flex items-center">
        <span className="text-gray-600 font-semibold">مرحباً، {auth?.user?.username}</span>
      </div>
    </header>
  );
};

export default Header;