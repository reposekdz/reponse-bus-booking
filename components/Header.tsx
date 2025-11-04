import React, { useState } from 'react';
import { Page } from '../App';
import { SunIcon, MoonIcon, MenuIcon, XIcon, UserCircleIcon, BuildingOfficeIcon, LanguageIcon, ChevronDownIcon, WalletIcon, BusIcon, BellIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  user: any | null;
  onLogout: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  onToggleCompaniesAside: () => void;
}

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
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { language, setLanguage, t, languages } = useLanguage();

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const selectLanguage = (lang) => {
    setLanguage(lang.code);
    setIsLangOpen(false);
  };

  const currentLang = languages.find(l => l.code === language);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-[#0033A0] via-[#00574B] to-[#204F46] text-white shadow-lg backdrop-blur-sm bg-opacity-90">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        <button onClick={() => onNavigate('home')} className="group flex items-center gap-2 text-2xl font-extrabold tracking-tight transition-transform duration-300 hover:scale-105">
          <BusIcon className="w-8 h-8 transition-transform duration-500 group-hover:-translate-x-1 group-hover:text-yellow-300" />
          <span>Rwanda<span className="text-yellow-300">Bus</span></span>
        </button>

        <nav className="hidden lg:flex items-center space-x-2">
          <NavLink page="home" currentPage={currentPage} onNavigate={onNavigate}>{t('nav_home')}</NavLink>
          <NavLink page="bookingSearch" currentPage={currentPage} onNavigate={onNavigate}>{t('nav_booking')}</NavLink>
          <button onClick={onToggleCompaniesAside} className="px-4 py-2 text-sm font-semibold text-white hover:text-yellow-200 transition-colors duration-200">{t('nav_companies')}</button>
          <NavLink page="services" currentPage={currentPage} onNavigate={onNavigate}>{t('nav_services')}</NavLink>
          <NavLink page="help" currentPage={currentPage} onNavigate={onNavigate}>{t('nav_help')}</NavLink>
          <NavLink page="contact" currentPage={currentPage} onNavigate={onNavigate}>{t('nav_contact')}</NavLink>
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
           <div className="relative hidden lg:block">
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center space-x-1 p-2 rounded-full hover:bg-white/10">
              <LanguageIcon className="w-5 h-5" />
              <span className="text-xs font-bold">{currentLang?.code}</span>
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

          <div className="relative hidden lg:block">
            <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="p-2 rounded-full hover:bg-white/10 relative">
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white/20"></span>
            </button>
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl animate-fade-in" onMouseLeave={() => setIsNotificationsOpen(false)}>
                <div className="p-3 font-bold text-gray-800 dark:text-white border-b dark:border-gray-700">Notifications</div>
                <div className="py-2">
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <p className="font-semibold">Trip Reminder</p>
                        <p className="text-xs">Your trip to Rubavu is tomorrow at 07:00.</p>
                    </div>
                     <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <p className="font-semibold text-red-500">Promotion!</p>
                        <p className="text-xs">Get 10% off on all weekend trips.</p>
                    </div>
                </div>
                 <div className="p-2 border-t dark:border-gray-700 text-center">
                    <button className="text-xs text-blue-600 dark:text-blue-400 font-semibold">View All</button>
                </div>
              </div>
            )}
          </div>
          
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
                        <button onClick={() => { onNavigate('profile'); setIsUserMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"><UserCircleIcon className="w-5 h-5 mr-2"/> {t('usermenu_profile')}</button>
                        <button onClick={() => { onNavigate('bookings'); setIsUserMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"><UserCircleIcon className="w-5 h-5 mr-2"/> {t('usermenu_bookings')}</button>
                        <button onClick={() => { onNavigate('profile'); setIsUserMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"><WalletIcon className="w-5 h-5 mr-2"/> {t('usermenu_wallet')}</button>
                    </div>
                     <div className="border-t dark:border-gray-700 p-2">
                        <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">{t('usermenu_logout')}</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => onNavigate('login')} className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0033A0] rounded-md hover:saturate-150 transition-all shadow-md transform hover:-translate-y-0.5">{t('login_button')}</button>
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
                    <button onClick={() => {onNavigate('home'); setIsMobileMenuOpen(false);}}>{t('nav_home')}</button>
                    <button onClick={() => {onNavigate('bookingSearch'); setIsMobileMenuOpen(false);}}>{t('nav_booking')}</button>
                    <button onClick={() => {onToggleCompaniesAside(); setIsMobileMenuOpen(false);}}>{t('nav_companies')}</button>
                    <button onClick={() => {onNavigate('services'); setIsMobileMenuOpen(false);}}>{t('nav_services')}</button>
                    <button onClick={() => {onNavigate('help'); setIsMobileMenuOpen(false);}}>{t('nav_help')}</button>
                    <button onClick={() => {onNavigate('contact'); setIsMobileMenuOpen(false);}}>{t('nav_contact')}</button>

                     <div className="border-t border-white/20 my-4"></div>
                     {user ? (
                         <>
                            <button onClick={() => {onNavigate('profile'); setIsMobileMenuOpen(false);}} className="flex items-center space-x-3">
                                <img src={user.avatarUrl} alt="User" className="w-8 h-8 rounded-full" />
                                <span>{user.name}</span>
                            </button>
                            <button onClick={() => {onLogout(); setIsMobileMenuOpen(false);}} className="text-red-400 text-left">{t('usermenu_logout')}</button>
                         </>
                     ) : (
                        <button onClick={() => {onNavigate('login'); setIsMobileMenuOpen(false);}} className="px-4 py-2 text-sm font-semibold bg-yellow-400 text-[#0033A0] rounded-md hover:bg-yellow-500 transition-colors">{t('login_button')}</button>
                     )}
                 </nav>
            </div>
        </div>
      )}
    </header>
  );
};

export default Header;