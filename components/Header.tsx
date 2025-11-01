import React, { useState } from 'react';
import { BusIcon, SunIcon, MoonIcon, BellIcon, MenuIcon, XIcon } from './icons';
import type { Page } from '../App';

interface HeaderProps {
  navigate: (page: Page) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const Header: React.FC<HeaderProps> = ({ navigate, isLoggedIn, onLogout, theme, setTheme }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: { label: string; page: Page }[] = [
    { label: 'Ahabanza', page: 'home' },
    { label: 'Amatike Yanjye', page: 'bookings' },
    { label: 'Ibigo', page: 'companies' },
    { label: 'Ubufasha', page: 'help' },
    { label: 'Twandikire', page: 'contact' },
  ];
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const handleNavClick = (page: Page) => {
    navigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0033A0] to-[#0c2461] shadow-lg text-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <button onClick={() => handleNavClick('home')} className="flex items-center space-x-2 focus:outline-none">
          <BusIcon className="h-8 w-8 bg-gradient-to-r from-blue-400 to-yellow-300 p-1 rounded" />
          <span className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-yellow-300">
            RWANDA BUS
          </span>
        </button>
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className="text-gray-200 hover:text-yellow-300 transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={toggleTheme} className="text-gray-200 hover:text-yellow-300 transition-colors duration-300">
            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
          </button>
          
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className="text-gray-200 hover:text-yellow-300 transition-colors duration-300">
              <BellIcon className="w-6 h-6" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 text-gray-800 dark:text-gray-200">
                <p className="font-bold mb-2">Ibimenyetso</p>
                <div className="text-sm space-y-2">
                  <p>Urugendo rwawe rujya i Rubavu ni ejo!</p>
                  <p className="text-green-600 dark:text-green-400">Gura itike ubu ubone igabanyirizwa rya 10%.</p>
                </div>
              </div>
            )}
          </div>

          {isLoggedIn ? (
            <button 
              onClick={onLogout}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0033A0] hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-md text-sm font-semibold"
            >
              Sohoka
            </button>
          ) : (
            <>
              <button 
                onClick={() => handleNavClick('login')}
                className="px-4 py-2 rounded-md border border-blue-400 text-blue-300 hover:bg-blue-400 hover:text-white transition-all duration-300 text-sm font-semibold"
              >
                Injira
              </button>
              <button 
                onClick={() => handleNavClick('register')}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0033A0] hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-md text-sm font-semibold"
              >
                Iyandikishe
              </button>
            </>
          )}
        </div>
         <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0c2461] dark:bg-gray-900 pb-4">
          <nav className="flex flex-col items-center space-y-4">
            {navItems.map((item) => (
              <button key={item.page} onClick={() => handleNavClick(item.page)} className="text-gray-200 hover:text-yellow-300 transition-colors duration-300">
                {item.label}
              </button>
            ))}
             <div className="flex flex-col items-center space-y-4 pt-4 border-t border-gray-700 w-full">
               {isLoggedIn ? (
                  <button onClick={onLogout} className="w-3/4 px-4 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0033A0] text-sm font-semibold">
                    Sohoka
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleNavClick('login')} className="w-3/4 px-4 py-2 rounded-md border border-blue-400 text-blue-300 text-sm font-semibold">
                      Injira
                    </button>
                    <button onClick={() => handleNavClick('register')} className="w-3/4 px-4 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0033A0] text-sm font-semibold">
                      Iyandikishe
                    </button>
                  </>
                )}
                <button onClick={toggleTheme} className="text-gray-200 hover:text-yellow-300 transition-colors duration-300 pt-2">
                    {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
                </button>
              </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;