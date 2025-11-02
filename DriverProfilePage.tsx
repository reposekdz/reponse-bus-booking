

import React from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, CalendarIcon, BriefcaseIcon, ArrowRightIcon } from './components/icons';

interface DriverProfilePageProps {
    driver: any;
}

const DriverProfilePage: React.FC<DriverProfilePageProps> = ({ driver }) => {
    if (!driver || !driver.name) {
        return <div className="p-8 text-center dark:text-white">Loading driver data...</div>;
    }

    const memberSince = driver.joinDate ? new Date(driver.joinDate).toLocaleString('default', { month: 'long', year: 'numeric' }) : 'N/A';

    return (
        <div className="bg-gray-100/50 dark:bg-gray-900/50 min-h-full py-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="h-40 bg-blue-600">
                        {driver.coverUrl && <img src={driver.coverUrl} alt="Cover" className="w-full h-full object-cover"/>}
                    </div>
                    <div className="px-6 pb-6">
                        <div className="flex justify-center -mt-16">
                            <img src={driver.avatarUrl} alt={driver.name} className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"/>
                        </div>
                        <div className="text-center mt-4">
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{driver.name}</h1>
                            <p className="text-gray-600 dark:text-gray-400">{driver.company}</p>
                        </div>
                        <div className="mt-6 flex justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center"><MapPinIcon className="w-4 h-4 mr-1.5"/>{driver.location}</span>
                            <span className="flex items-center"><CalendarIcon className="w-4 h-4 mr-1.5"/>Yinjiye muri {memberSince}</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-200 dark:bg-gray-700">
                        <div className="bg-white dark:bg-gray-800 text-center p-4">
                            <p className="font-bold text-2xl text-blue-600 dark:text-blue-400">{driver.totalTrips || 0}</p>
                            <p className="text-sm text-gray-500">Ingendo Zose</p>
                        </div>
                         <div className="bg-white dark:bg-gray-800 text-center p-4">
                            <p className="font-bold text-2xl text-green-600 dark:text-green-400">{driver.safetyScore || 'N/A'}%</p>
                            <p className="text-sm text-gray-500">Amanota y'Umutekano</p>
                        </div>
                         <div className="bg-white dark:bg-gray-800 text-center p-4">
                            <p className="font-bold text-2xl text-yellow-500">4.9/5</p>
                            <p className="text-sm text-gray-500">Amanota y'Abagenzi</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                         {driver.bio && (
                            <div>
                                <h3 className="font-bold text-lg dark:text-white mb-2">Bio</h3>
                                <p className="text-gray-700 dark:text-gray-300 space-y-2 text-sm italic">"{driver.bio}"</p>
                            </div>
                        )}

                        <div>
                            <h3 className="font-bold text-lg dark:text-white mb-2">Amakuru bwite</h3>
                            <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                                 <p className="flex items-center"><PhoneIcon className="w-4 h-4 mr-2 text-gray-400"/> {driver.phone}</p>
                                 <p className="flex items-center"><EnvelopeIcon className="w-4 h-4 mr-2 text-gray-400"/> {driver.email}</p>
                                <p className="flex items-center"><BriefcaseIcon className="w-4 h-4 mr-2 text-gray-400"/> Assigned Bus: {driver.assignedBus}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverProfilePage;
