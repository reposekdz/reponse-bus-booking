import React from 'react';
import { ChartBarIcon, UsersIcon, BusIcon, MapIcon } from '../components/icons';

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

const CompanyDashboard: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold dark:text-gray-200 mb-6">Company Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Today's Passengers" value="1,250" icon={<UsersIcon />} />
                <StatCard title="Today's Revenue" value="5.6M RWF" icon={<ChartBarIcon />} />
                <StatCard title="Active Buses" value="25 / 30" icon={<BusIcon />} />
                <StatCard title="Popular Route" value="Kigali - Rubavu" icon={<MapIcon />} />
            </div>
             <div className="mt-8 bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold dark:text-white">Live Fleet Status</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-4">A map showing live bus locations will be displayed here...</p>
            </div>
        </div>
    );
};

export default CompanyDashboard;