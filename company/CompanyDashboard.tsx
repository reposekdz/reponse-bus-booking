import React, { useState } from 'react';
import { ChartBarIcon, UsersIcon, BusIcon, MapIcon, WalletIcon, StarIcon } from '../components/icons';
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

// Mock data moved inside for component self-containment
const companyMockData = {
    drivers: [
        { id: 'd1', name: 'John Doe', assignedBusId: 'RAD 123 B', phone: '0788111222', status: 'Active', onTimeRate: 98.5, rating: 4.8, avatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { id: 'd3', name: 'Mary Anne', assignedBusId: 'RAE 789 A', phone: '0788555666', status: 'On Leave', onTimeRate: 99.1, rating: 4.9, avatarUrl: 'https://randomuser.me/api/portraits/women/6.jpg' },
        { id: 'd4', name: 'Chris P.', assignedBusId: 'RAB 456 C', phone: '0788444555', status: 'Active', onTimeRate: 97.2, rating: 4.7, avatarUrl: 'https://randomuser.me/api/portraits/men/8.jpg' },
    ],
    buses: [
        { id: 'b1', plate: 'RAD 123 B', model: 'Yutong Explorer', capacity: 55, status: 'On Route', maintenanceDate: '2024-12-15', route: 'Kigali - Rubavu', progress: 75 },
        { id: 'b2', plate: 'RAE 789 A', model: 'Coaster', capacity: 30, status: 'On Route', maintenanceDate: '2024-11-30', route: 'Kigali - Huye', progress: 40 },
        { id: 'b3', plate: 'RAB 456 C', model: 'Yutong', capacity: 60, status: 'Idle', maintenanceDate: '2025-01-10', route: '', progress: 0 },
    ],
    routes: [
        { id: 'r1', from: 'Kigali', to: 'Rubavu', distance: '150km', duration: '3.5h', price: 4500, status: 'Active' },
        { id: 'r2', from: 'Kigali', to: 'Musanze', distance: '90km', duration: '2h', price: 3500, status: 'Active' },
    ]
};

interface CompanyDashboardProps {
    companyPin: string;
}

const CompanyDashboard: React.FC<CompanyDashboardProps> = ({ companyPin }) => {
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);
    
    const { drivers, buses, routes } = companyMockData;
    const activeBuses = buses.filter(b => b.status === 'On Route');
    const popularRoute = routes.length > 0 ? `${routes[0].from} - ${routes[0].to}` : 'N/A';
    
    const handlePinSuccess = () => {
        setIsPinModalOpen(false);
        alert('Payouts Authorized Successfully!');
    };

    const driverLeaderboard = [...drivers].sort((a,b) => b.rating - a.rating);

    return (
        <div>
            <h1 className="text-3xl font-bold dark:text-gray-200 mb-6">Company Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Drivers" value={drivers.length} icon={<UsersIcon />} />
                <StatCard title="Today's Revenue" value="5.6M RWF" icon={<ChartBarIcon />} />
                <StatCard title="Active Buses" value={`${activeBuses.length} / ${buses.length}`} icon={<BusIcon />} />
                <StatCard title="Popular Route" value={popularRoute} icon={<MapIcon />} />
            </div>
             <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold dark:text-white mb-4">Live Fleet Status</h2>
                    <div className="space-y-4 h-[22rem] overflow-y-auto custom-scrollbar pr-2">
                        {activeBuses.map(bus => (
                             <div key={bus.id} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-bold dark:text-white">{bus.plate}</p>
                                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{bus.route}</p>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-600">
                                  <div className="bg-green-600 h-2 rounded-full" style={{width: `${bus.progress}%`}}></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    <span>{bus.progress}% Complete</span>
                                    <span>On Time</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                 <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
                     <h2 className="text-xl font-bold dark:text-white mb-4">Driver Performance Leaderboard</h2>
                     <div className="space-y-3">
                        {driverLeaderboard.map((driver, index) => (
                            <div key={driver.id} className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                                <span className="font-bold text-lg text-gray-400 w-5">#{index + 1}</span>
                                <img src={driver.avatarUrl} alt={driver.name} className="w-10 h-10 rounded-full"/>
                                <div className="flex-1">
                                    <p className="font-semibold text-sm dark:text-white">{driver.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">On-Time: {driver.onTimeRate}%</p>
                                </div>
                                <div className="flex items-center font-bold text-yellow-500">
                                    <StarIcon className="w-4 h-4 mr-1"/>
                                    <span>{driver.rating}</span>
                                </div>
                            </div>
                        ))}
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