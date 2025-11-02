import React, { useState } from 'react';
import { MapIcon, SearchIcon, PlusIcon, PencilSquareIcon, TrashIcon, ClockIcon, ArrowRightIcon } from '../components/icons';

const mockRoutes = [
  { id: 1, from: 'Kigali', to: 'Rubavu', duration: '3.5h', basePrice: '4,500 RWF', activeSchedules: 5 },
  { id: 2, from: 'Kigali', to: 'Musanze', duration: '2h', basePrice: '3,500 RWF', activeSchedules: 3 },
  { id: 3, from: 'Rubavu', to: 'Kigali', duration: '3.5h', basePrice: '4,500 RWF', activeSchedules: 5 },
];

const CompanyRoutes: React.FC = () => {
    const [routes, setRoutes] = useState(mockRoutes);
    const [searchTerm, setSearchTerm] = useState('');
    
    return (
        <div>
            <h1 className="text-3xl font-bold dark:text-gray-200 mb-6">Manage Routes & Schedules</h1>
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
                 <div className="flex justify-between items-center mb-4">
                    <div className="relative w-full max-w-xs">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search routes..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                    <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
                        <PlusIcon className="w-5 h-5 mr-2" /> Add Route
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="p-3">Route</th>
                                <th className="p-3">Duration</th>
                                <th className="p-3">Base Price</th>
                                <th className="p-3">Schedules</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {routes.filter(r => `${r.from}-${r.to}`.toLowerCase().includes(searchTerm.toLowerCase())).map(route => (
                                <tr key={route.id} className="border-t dark:border-gray-700">
                                    <td className="p-3 font-semibold dark:text-white flex items-center">
                                        {route.from} <ArrowRightIcon className="w-4 h-4 mx-2 text-gray-400"/> {route.to}
                                    </td>
                                    <td><ClockIcon className="w-4 h-4 inline mr-1 text-gray-400"/>{route.duration}</td>
                                    <td>{route.basePrice}</td>
                                    <td>{route.activeSchedules} active</td>
                                    <td className="flex space-x-2 p-3">
                                        <button className="p-1 text-gray-500 hover:text-blue-600"><PencilSquareIcon className="w-5 h-5"/></button>
                                        <button className="p-1 text-gray-500 hover:text-red-600"><TrashIcon className="w-5 h-5"/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CompanyRoutes;