import React from 'react';
import { ChartPieIcon } from './icons';

const StatCard = ({ label, value, icon }) => (
    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg flex items-center space-x-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
            {React.cloneElement(icon, { className: "w-8 h-8 text-blue-500"})}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
            <p className="font-bold text-3xl dark:text-white">{value}</p>
        </div>
    </div>
);

const DriverPerformance = ({ performance }) => {
    if (!performance) {
        return <p>No performance data available.</p>;
    }
    
    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold dark:text-gray-200 mb-6">My Performance</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <StatCard label="On-Time Rate" value={`${performance.onTimeRate}%`} icon={<ChartPieIcon />} />
                 <StatCard label="Trip Completion" value={`${performance.completionRate}%`} icon={<ChartPieIcon />} />
                 <StatCard label="Average Rating" value={`${performance.averageRating} / 5`} icon={<ChartPieIcon />} />
                 <StatCard label="Safety Score" value={`${performance.safetyScore}%`} icon={<ChartPieIcon />} />
            </div>
            <div className="mt-8 bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold dark:text-white">Performance Analytics</h2>
                <div className="h-64 flex items-center justify-center">
                    <p className="text-gray-500">Detailed charts will be available here soon.</p>
                </div>
            </div>
        </div>
    );
};

export default DriverPerformance;
