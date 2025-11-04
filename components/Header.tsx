import React, { useState } from 'react';
import { Page } from '../App';
import { SunIcon, MoonIcon, MenuIcon, XIcon, UserCircleIcon, BuildingOfficeIcon, LanguageIcon, ChevronDownIcon, WalletIcon, BusIcon } from './icons';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  user: any | null;
  onLogout: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  onToggleCompaniesAside: () => void;
}

const navTranslations = {
  'RW': { home: 'Ahabanza', booking: 'Gukata Itike', companies: 'Ibigo', services: 'Serivisi', help: 'Ubufasha', contact: 'Twandikire' },
  'EN': { home: 'Home', booking: 'Book Ticket', companies: 'Companies', services: 'Services', help: 'Help', contact: 'Contact Us' },
  'FR': { home: 'Accueil', booking: 'Réserver', companies: 'Agences', services: 'Services', help: 'Aide', contact: 'Contactez-nous' }
};


const NavLink: React.FC<{ page: Page; currentPage: Page; onNavigate: (page: Page) => void; children: React.ReactNode }> = ({ page, currentPage, onNavigate, children }) => (
  <button 
    onClick={() => onNavigate(page)}
    className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${currentPage === page ? 'text-yellow-300' : 'text-white hover:text-yellow-200'}`}
  >
    {children}
  </button>
);

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, user, onLogout, theme, setTheme, onToggleCompaniesAside }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState({ code: 'RW', name: 'Kinyarwanda', flag: '🇷🇼' });

  const languages = [
    { code: 'RW', name: 'Kinyarwanda', flag: '🇷🇼' },
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
  ];

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const selectLanguage = (lang) => {
    setCurrentLang(lang);
    setIsLangOpen(false);
  };
  
  const T = navTranslations[currentLang.code];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-[#0033A0] via-[#00574B] to-[#204F46] text-white shadow-lg backdrop-blur-sm bg-opacity-90">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        <button onClick={() => onNavigate('home')} className="group flex items-center gap-2 text-2xl font-extrabold tracking-tight transition-transform duration-300 hover:scale-105">
          <BusIcon className="w-8 h-8 transition-transform duration-500 group-hover:-translate-x-1 group-hover:text-yellow-300" />
          <span>Rwanda<span className="text-yellow-300">Bus</span></span>
        </button>

        <nav className="hidden lg:flex items-center space-x-2">
          <NavLink page="home" currentPage={currentPage} onNavigate={onNavigate}>{T.home}</NavLink>
          <NavLink page="bookingSearch" currentPage={currentPage} onNavigate={onNavigate}>{T.booking}</NavLink>
          <button onClick={onToggleCompaniesAside} className="px-4 py-2 text-sm font-semibold text-white hover:text-yellow-200 transition-colors duration-200">{T.companies}</button>
          <NavLink page="services" currentPage={currentPage} onNavigate={onNavigate}>{T.services}</NavLink>
          <NavLink page="help" currentPage={currentPage} onNavigate={onNavigate}>{T.help}</NavLink>
          <NavLink page="contact" currentPage={currentPage} onNavigate={onNavigate}>{T.contact}</NavLink>
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
           <div className="relative hidden lg:block">
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center space-x-2 p-2 rounded-full hover:bg-white/10">
              <LanguageIcon className="w-5 h-5" />
              <ChevronDownIcon className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            {isLangOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 animate-fade-in"
                onMouseLeave={() => setIsLangOpen(false)}
              >
                {languages.map(lang => (
                  <button key={lang.code} onClick={() => selectLanguage(lang)} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span className="mr-3">{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10">
            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
          </button>
          
          <div className="hidden lg:flex items-center">
            {user ? (
              <div className="relative">
                <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center space-x-2 p-1 rounded-full hover:bg-white/10">
                  <img src={user.avatarUrl} alt="User" className="w-8 h-8 rounded-full" />
                </button>
                {isUserMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg animate-fade-in"
                    onMouseLeave={() => setIsUserMenuOpen(false)}
                  >
                    <div className="p-4 border-b dark:border-gray-700">
                        <p className="font-bold text-gray-800 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                    <div className="py-2">
                        <button onClick={() => { onNavigate('profile'); setIsUserMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"><UserCircleIcon className="w-5 h-5 mr-2"/> Umwirondoro</button>
                        <button onClick={() => { onNavigate('bookings'); setIsUserMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"><UserCircleIcon className="w-5 h-5 mr-2"/> Amatike Yanjye</button>
                        <button onClick={() => { onNavigate('profile'); setIsUserMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"><WalletIcon className="w-5 h-5 mr-2"/> Ikofi</button>
                    </div>
                     <div className="border-t dark:border-gray-700 p-2">
                        <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">Sohoka</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => onNavigate('login')} className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0033A0] rounded-md hover:saturate-150 transition-all shadow-md transform hover:-translate-y-0.5">Injira</button>
            )}
          </div>
          
          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      
       {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm lg:hidden">
            <div className="absolute top-0 right-0 w-full max-w-xs bg-gradient-to-b from-[#0033A0] to-[#0c2461] h-full p-6">
                <div className="flex justify-between items-center mb-8">
                    <span className="text-xl font-bold">Menu</span>
                    <button onClick={() => setIsMobileMenuOpen(false)}><XIcon className="w-6 h-6"/></button>
                </div>
                 <nav className="flex flex-col space-y-4">
                    <button onClick={() => {onNavigate('home'); setIsMobileMenuOpen(false);}}>{T.home}</button>
                    <button onClick={() => {onNavigate('bookingSearch'); setIsMobileMenuOpen(false);}}>{T.booking}</button>
                    <button onClick={() => {onToggleCompaniesAside(); setIsMobileMenuOpen(false);}}>{T.companies}</button>
                    <button onClick={() => {onNavigate('services'); setIsMobileMenuOpen(false);}}>{T.services}</button>
                    <button onClick={() => {onNavigate('help'); setIsMobileMenuOpen(false);}}>{T.help}</button>
                    <button onClick={() => {onNavigate('contact'); setIsMobileMenuOpen(false);}}>{T.contact}</button>

                     <div className="border-t border-white/20 my-4"></div>
                     {user ? (
                         <>
                            <button onClick={() => {onNavigate('profile'); setIsMobileMenuOpen(false);}} className="flex items-center space-x-3">
                                <img src={user.avatarUrl} alt="User" className="w-8 h-8 rounded-full" />
                                <span>{user.name}</span>
                            </button>
                            <button onClick={() => {onLogout(); setIsMobileMenuOpen(false);}} className="text-red-400 text-left">Sohoka</button>
                         </>
                     ) : (
                        <button onClick={() => {onNavigate('login'); setIsMobileMenuOpen(false);}} className="px-4 py-2 text-sm font-semibold bg-yellow-400 text-[#0033A0] rounded-md hover:bg-yellow-500 transition-colors">Injira</button>
                     )}
                 </nav>
            </div>
        </div>
      )}
    </header>
  );
};

export default Header;