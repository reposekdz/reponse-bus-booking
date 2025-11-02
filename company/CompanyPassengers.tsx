import React, { useState } from 'react';
import { UsersIcon, SearchIcon } from '../components/icons';

const mockPassengers = [
  { id: 1, name: 'Kalisa Jean', route: 'Kigali - Rubavu', date: '2024-10-25' },
  { id: 2, name: 'Mugisha Frank', route: 'Kigali - Musanze', date: '2024-10-25' },
  { id: 3, name: 'Irakoze Grace', route: 'Kigali - Rubavu', date: '2024-10-24' },
];

const CompanyPassengers: React.FC = () => {
    const [passengers, setPassengers] = useState(mockPassengers);
    const [searchTerm, setSearchTerm] = useState('');
    
    return (
        <div>
            <h1 className="text-3xl font-bold dark:text-gray-200 mb-6">Passenger History</h1>
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
                 <div className="relative w-full max-w-xs mb-4">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by passenger name..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="p-3">Passenger Name</th>
                                <th className="p-3">Route</th>
                                <th className="p-3">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passengers.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(passenger => (
                                <tr key={passenger.id} className="border-t dark:border-gray-700">
                                    <td className="p-3 font-semibold dark:text-white">{passenger.name}</td>
                                    <td>{passenger.route}</td>
                                    <td>{new Date(passenger.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CompanyPassengers;