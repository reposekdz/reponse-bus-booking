import React, { useState } from 'react';
import { Page } from '../App';
import { ChartBarIcon, BusIcon, UsersIcon, MapIcon, WalletIcon, CogIcon, ChartPieIcon, MenuIcon, XIcon, MoonIcon, SunIcon } from '../components/icons';
import CompanyDashboard from './CompanyDashboard';
import CompanyBuses from './CompanyBuses';
import CompanyDrivers from './CompanyDrivers';
import CompanyRoutes from './CompanyRoutes';
import CompanyPassengers from './CompanyPassengers';
import CompanyFinancials from './CompanyFinancials';
import CompanySettings from './CompanySettings';
import FleetMonitoring from './FleetMonitoring';
import CompanyRouteAnalytics from './CompanyRouteAnalytics';
import CompanyDriverProfile from './CompanyDriverProfile';

interface CompanyLayoutProps {
    currentPage: Page;
    navigate: (page: Page, data?: any) => void;
    pageData: any;
    companyData: any;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    onLogout: () => void;
}

const navItems: { page: Page; label: string; icon: React.FC<any> }[] = [
    { page: 'companyDashboard', label: 'Dashboard', icon: ChartBarIcon },
    { page: 'fleetMonitoring', label: 'Fleet Monitoring', icon: MapIcon },
    { page: 'companyRouteAnalytics', label: 'Route Analytics', icon: ChartPieIcon },
    { page: 'companyBuses', label: 'Manage Buses', icon: BusIcon },
    { page: 'companyDrivers', label: 'Manage Drivers', icon: UsersIcon },
    { page: 'companyRoutes', label: 'Manage Routes', icon: MapIcon },
    { page: 'companyPassengers', label: 'Passengers', icon: UsersIcon },
    { page: 'companyFinancials', label: 'Financials', icon: WalletIcon },
    { page: 'companySettings', label: 'Settings', icon: CogIcon },
];

const MobileNav: React.FC<{isOpen: boolean, onClose: () => void, navigate: (page: Page) => void, currentPage: Page}> = ({isOpen, onClose, navigate, currentPage}) => (
    <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className={`absolute top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-xl">Company Menu</span>
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


const CompanyLayout: React.FC<CompanyLayoutProps> = ({ currentPage, navigate, pageData, companyData, theme, setTheme, onLogout }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const renderContent = () => {
        switch (currentPage) {
            case 'companyDashboard': return <CompanyDashboard companyPin={companyData.pin} />;
            case 'companyBuses': return <CompanyBuses companyId={companyData.id} />;
            case 'companyDrivers': return <CompanyDrivers companyId={companyData.id} navigate={navigate} />;
            case 'companyDriverProfile': return <CompanyDriverProfile driver={pageData} onBack={() => navigate('companyDrivers')} />;
            case 'companyRoutes': return <CompanyRoutes companyId={companyData.id} />;
            case 'companyPassengers': return <CompanyPassengers />;
            case 'companyFinancials': return <CompanyFinancials />;
            case 'companySettings': return <CompanySettings companyData={companyData} />;
            case 'fleetMonitoring': return <FleetMonitoring />;
            case 'companyRouteAnalytics': return <CompanyRouteAnalytics />;
            default: return <CompanyDashboard companyPin={companyData.pin} />;
        }
    };
    
    return (
        <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
            <aside className="w-64 bg-gradient-to-b from-gray-800 via-gray-900 to-black text-gray-300 flex-col hidden lg:flex">
                <div className="h-20 flex items-center justify-center text-white font-bold text-xl border-b border-white/10">{companyData?.name || 'Company'}</div>
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
                        <button className="lg:hidden mr-4" onClick={() => setIsMobileMenuOpen(true)}>
                            <MenuIcon className="w-6 h-6 text-gray-700 dark:text-gray-200"/>
                        </button>
                        <div className="font-bold text-gray-800 dark:text-white">Welcome, {companyData?.name} Manager</div>
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

export default CompanyLayout;