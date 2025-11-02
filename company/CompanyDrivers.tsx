import React, { useState } from 'react';
import { UsersIcon, SearchIcon } from '../components/icons';

// FIX: Define props interface
interface CompanyDriversProps {
    drivers: any[];
    crudHandlers: any;
}

// FIX: Use props for data and handlers, remove local state for drivers list
const CompanyDrivers: React.FC<CompanyDriversProps> = ({ drivers, crudHandlers }) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    return (
        <div>
            <h1 className="text-3xl font-bold dark:text-gray-200 mb-6">Our Drivers</h1>
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
                 <div className="relative w-full max-w-xs mb-4">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search drivers..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="p-3">Driver Name</th>
                                <th className="p-3">Assigned Bus</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Current Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drivers.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).map(driver => (
                                <tr key={driver.id} className="border-t dark:border-gray-700">
                                    <td className="p-3 font-semibold dark:text-white">{driver.name}</td>
                                    <td>{driver.assignedBusId}</td>
                                    <td>{driver.phone}</td>
                                    <td>
                                         <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            driver.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {driver.status}
                                        </span>
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

export default CompanyDrivers;
