import React from 'react';
import { BusIcon } from './icons';
import type { Page } from '../App';

interface HeaderProps {
  navigate: (page: Page) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ navigate, isLoggedIn, onLogout }) => {
  const navItems: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Bookings', page: 'bookings' },
    { label: 'Companies', page: 'companies' },
    { label: 'Help', page: 'help' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0033A0] to-[#0c2461] shadow-lg text-white">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <button onClick={() => navigate('home')} className="flex items-center space-x-2 focus:outline-none">
          <BusIcon className="h-8 w-8 bg-gradient-to-r from-blue-400 to-yellow-300 p-1 rounded" />
          <span className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-yellow-300">
            RWANDA BUS
          </span>
        </button>
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => navigate(item.page)}
              className="text-gray-200 hover:text-yellow-300 transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <button 
              onClick={onLogout}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0033A0] hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-md text-sm font-semibold"
            >
              Logout
            </button>
          ) : (
            <>
              <button 
                onClick={() => navigate('login')}
                className="px-4 py-2 rounded-md border border-blue-400 text-blue-300 hover:bg-blue-400 hover:text-white transition-all duration-300 text-sm font-semibold"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('register')}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0033A0] hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-md text-sm font-semibold"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
