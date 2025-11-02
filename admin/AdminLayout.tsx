import React, { useState } from 'react';
import {
    SunIcon, MoonIcon, CogIcon, UsersIcon, ChartBarIcon, BuildingOfficeIcon,
    BusIcon, BriefcaseIcon, MenuIcon, XIcon, ArrowRightIcon
} from '../components/icons';
import AdminDashboard from './AdminDashboard';
import ManageCompanies from './ManageCompanies';
import ManageDrivers from './ManageDrivers';
import ManageAgents from './ManageAgents';
import ManagePassengers from './ManagePassengers';

interface AdminLayoutProps {
    onLogout: () => void;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
}

type AdminPage = 'dashboard' | 'companies' | 'drivers' | 'agents' | 'passengers';

const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout, theme, setTheme }) => {
    const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    const renderContent = () => {
        switch (currentPage) {
            case 'companies': return <ManageCompanies />;
            case 'drivers': return <ManageDrivers />;
            case 'agents': return <ManageAgents />;
            case 'passengers': return <ManagePassengers />;
            case 'dashboard':
            default:
                return <AdminDashboard />;
        }
    };

    const NavLink: React.FC<{ page: AdminPage; label: string; icon: React.ElementType }> = ({ page, label, icon: Icon }) => (
        <button 
            onClick={() => { setCurrentPage(page); setIsSidebarOpen(false); }}
            className={`group w-full flex items-center px-4 py-3 transition-all duration-300 rounded-lg relative ${currentPage === page ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
            <div className={`absolute left-0 top-0 h-full w-1 rounded-r-full bg-yellow-400 transition-all duration-300 ${currentPage === page ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-50'}`}></div>
            <Icon className="w-6 h-6 mr-4 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-semibold">{label}</span>
        </button>
    );

    const SidebarContent = () => (
        <>
            <div className="h-20 flex items-center justify-center text-white font-bold text-xl border-b border-white/10 flex-shrink-0">ADMIN PANEL</div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                <NavLink page="dashboard" label="Dashboard" icon={ChartBarIcon} />
                <NavLink page="companies" label="Manage Companies" icon={BuildingOfficeIcon} />
                <NavLink page="drivers" label="Manage Drivers" icon={BusIcon} />
                <NavLink page="agents" label="Manage Agents" icon={BriefcaseIcon} />
                <NavLink page="passengers" label="Manage Passengers" icon={UsersIcon} />
            </nav>
            <div className="p-4 border-t border-white/10 flex-shrink-0">
                 <button className="w-full flex items-center px-4 py-3 text-gray-400 hover:text-white">
                    <CogIcon className="w-6 h-6 mr-4"/>
                    <span className="font-semibold">Settings</span>
                 </button>
            </div>
        </>
    );

    return (
        <div className={`min-h-screen flex ${theme}`}>
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-gray-800 via-gray-900 to-black text-gray-300 flex-col hidden lg:flex border-r border-gray-700/50">
                <SidebarContent />
            </aside>
            
            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-40 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`} onClick={() => setIsSidebarOpen(false)}>
                <div className="absolute inset-0 bg-black/60"></div>
                <aside className="absolute top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-800 via-gray-900 to-black text-gray-300 flex flex-col transform transition-transform duration-300 ease-in-out" style={{transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)'}}>
                    <SidebarContent />
                </aside>
            </div>

            <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900">
                <header className="h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm flex items-center justify-between px-6 border-b dark:border-gray-700/50 sticky top-0 z-30">
                    <button className="lg:hidden text-gray-500 dark:text-gray-400" onClick={() => setIsSidebarOpen(true)}>
                        <MenuIcon className="w-6 h-6"/>
                    </button>
                    <div className="font-bold text-gray-800 dark:text-white hidden lg:block">Admin / <span className="capitalize">{currentPage}</span></div>
                    <div className="flex items-center space-x-4">
                        <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400">{theme === 'light' ? <MoonIcon className="w-6 h-6"/> : <SunIcon className="w-6 h-6"/>}</button>
                        <button onClick={onLogout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Logout</button>
                    </div>
                </header>
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <div className="animate-fade-in">{renderContent()}</div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;