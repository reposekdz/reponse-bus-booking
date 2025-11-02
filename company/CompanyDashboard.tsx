import React, { useState } from 'react';
import { ChartBarIcon, UsersIcon, BusIcon, MapIcon, WalletIcon } from '../components/icons';
import PinModal from '../components/PinModal';

const StatCard = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                {React.cloneElement(icon, { className: "w-7 h-7 text-blue-600" })}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            </div>
        </div>
    </div>
);

interface CompanyDashboardProps {
    drivers: any[];
    buses: any[];
    routes: any[];
    companyPin: string;
}

const CompanyDashboard: React.FC<CompanyDashboardProps> = ({ drivers, buses, routes, companyPin }) => {
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);
    const activeBuses = buses.filter(b => b.status === 'On Route').length;
    const popularRoute = routes.length > 0 ? `${routes[0].from} - ${routes[0].to}` : 'N/A';
    
    const handlePinSuccess = () => {
        setIsPinModalOpen(false);
        alert('Payouts Authorized Successfully!');
    };

    return (
        <div>
            <h1 className="text-3xl font-bold dark:text-gray-200 mb-6">Company Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Drivers" value={drivers.length} icon={<UsersIcon />} />
                <StatCard title="Today's Revenue" value="5.6M RWF" icon={<ChartBarIcon />} />
                <StatCard title="Active Buses" value={`${activeBuses} / ${buses.length}`} icon={<BusIcon />} />
                <StatCard title="Popular Route" value={popularRoute} icon={<MapIcon />} />
            </div>
             <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold dark:text-white">Live Fleet Status</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-4">A map showing live bus locations will be displayed here...</p>
                    <div className="h-64 bg-gray-200 dark:bg-gray-700/50 mt-4 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Map Area</p>
                    </div>
                </div>
                 <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
                     <h2 className="text-xl font-bold dark:text-white mb-4 flex items-center">
                        <WalletIcon className="w-6 h-6 mr-3 text-green-500"/>
                        Financials
                    </h2>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Authorize company expenses and payroll securely.</p>
                         <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                            <p className="text-sm font-semibold dark:text-gray-200">Pending Payouts</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">1,850,000 RWF</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">For {drivers.length} drivers (Oct 2024)</p>
                        </div>
                        <button 
                            onClick={() => setIsPinModalOpen(true)}
                            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                        >
                            Authorize Payouts
                        </button>
                    </div>
                </div>
            </div>
            {isPinModalOpen && (
                <PinModal
                    onClose={() => setIsPinModalOpen(false)}
                    onSuccess={handlePinSuccess}
                    pinToMatch={companyPin}
                    title="Authorize Financials"
                    description="Enter your company PIN to authorize this payout."
                />
            )}
        </div>
    );
};

export default CompanyDashboard;