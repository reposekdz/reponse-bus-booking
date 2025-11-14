import React, { useState } from 'react';
import { Page } from '../App';
import { ChartBarIcon, BuildingOfficeIcon, UsersIcon, BriefcaseIcon, SunIcon, MoonIcon, MegaphoneIcon, TagIcon, CurrencyDollarIcon, MenuIcon, XIcon, ChatBubbleLeftRightIcon, CogIcon, MapIcon } from '../components/icons';
import AdminDashboard from './AdminDashboard';
import ManageCompanies from './ManageCompanies';
import ManageDrivers from './ManageDrivers';
import ManageAgents from './ManageAgents';
import ManageUsers from './ManageUsers';
import AdminFinancials from './AdminFinancials';
import ManageAds from './ManageAds';
import ManagePromotions from './ManagePromotions';
import PlatformAnnouncements from './PlatformAnnouncements';
import ManageMessages from './ManageMessages';
import ManageSite from './ManageSite';
import ManageDestinations from './ManageDestinations';


interface AdminLayoutProps {
    currentPage: Page;
    navigate: (page: Page, data?: any) => void;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    onLogout: () => void;
}

const navItems: { page: Page; label: string; icon: React.FC<any> }[] = [
    { page: 'adminDashboard', label: 'Dashboard', icon: ChartBarIcon },
    { page: 'adminMessages', label: 'Messages', icon: ChatBubbleLeftRightIcon },
    { page: 'adminFinancials', label: 'Financials', icon: CurrencyDollarIcon },
    { page: 'adminCompanies', label: 'Companies', icon: BuildingOfficeIcon },
    { page: 'adminDrivers', label: 'Drivers', icon: UsersIcon },
    { page: 'adminAgents', label: 'Agents', icon: BriefcaseIcon },
    { page: 'adminUsers', label: 'All Users', icon: UsersIcon },
    { page: 'adminPromotions', label: 'Promotions', icon: TagIcon },
    { page: 'adminAds', label: 'Adverts', icon: MegaphoneIcon },
    { page: 'adminAnnouncements', label: 'Announcements', icon: MegaphoneIcon },
    { page: 'adminDestinations', label: 'Destinations', icon: MapIcon },
    { page: 'adminSettings', label: 'Site Settings', icon: CogIcon },
];

const MobileNav: React.FC<{isOpen: boolean, onClose: () => void, navigate: (page: Page) => void, currentPage: Page}> = ({isOpen, onClose, navigate, currentPage}) => (
    <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className={`absolute top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-xl">Admin Menu</span>
                <button onClick={onClose}><XIcon className="w-6 h-6"/></button>
            </div>
            <nav className="space-y-2">
                {navItems.map(item => (
                    <button key={item.page} onClick={() => { navigate(item.page); onClose(); }} className={`w-full flex items-center p-3 rounded-lg ${currentPage === item.page ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                        <item.icon className="w-5 h-5 mr-3"/>
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    </div>
);

const AdminLayout: React.FC<AdminLayoutProps> = ({ currentPage, navigate, theme, setTheme, onLogout }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const renderContent = () => {
        switch (currentPage) {
            case 'adminDashboard': return <AdminDashboard />;
            case 'adminCompanies': return <ManageCompanies />;
            case 'adminDrivers': return <ManageDrivers navigate={navigate} />;
            case 'adminAgents': return <ManageAgents navigate={navigate} />;
            case 'adminUsers': return <ManageUsers navigate={navigate} />;
            case 'adminFinancials': return <AdminFinancials />;
            case 'adminAds': return <ManageAds />;
            case 'adminPromotions': return <ManagePromotions />;
            case 'adminAnnouncements': return <PlatformAnnouncements />;
            case 'adminMessages': return <ManageMessages />;
            case 'adminSettings': return <ManageSite />;
            case 'adminDestinations': return <ManageDestinations />;
            default: return <AdminDashboard />;
        }
    };
    
    return (
        <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
            <aside className="w-64 bg-gradient-to-b from-gray-800 via-gray-900 to-black text-gray-300 flex-col hidden md:flex">
                <div className="h-20 flex items-center justify-center text-white font-bold text-xl border-b border-white/10">ADMIN PANEL</div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navItems.map(item => (
                        <button key={item.page} onClick={() => navigate(item.page)} className={`group w-full flex items-center px-4 py-3 transition-all duration-300 rounded-lg relative ${currentPage === item.page ? 'text-white bg-white/10' : 'hover:text-white hover:bg-white/5'}`}>
                            <div className={`absolute left-0 top-0 h-full w-1 rounded-r-full bg-yellow-400 transition-all duration-300 ${currentPage === item.page ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-50'}`}></div>
                            <item.icon className="w-6 h-6 mr-4 transition-transform duration-300 group-hover:scale-110" />
                            <span className="font-semibold">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>
            <div className="flex-1 flex flex-col">
                <header className="h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm flex items-center justify-between px-6">
                    <div className="flex items-center">
                        <button className="md:hidden mr-4" onClick={() => setIsMobileMenuOpen(true)}>
                            <MenuIcon className="w-6 h-6 text-gray-700 dark:text-gray-200"/>
                        </button>
                        <div className="font-bold text-gray-800 dark:text-white">Welcome, Admin</div>
                    </div>
                     <div className="flex items-center space-x-4">
                        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="text-gray-500 dark:text-gray-400">{theme === 'light' ? <MoonIcon className="w-6 h-6"/> : <SunIcon className="w-6 h-6"/>}</button>
                        <button onClick={onLogout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Logout</button>
                    </div>
                </header>
                <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    {renderContent()}
                </main>
            </div>
            <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} navigate={navigate} currentPage={currentPage} />
        </div>
    );
};

export default AdminLayout;