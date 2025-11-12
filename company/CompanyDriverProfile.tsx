import React from 'react';
import { PhoneIcon, EnvelopeIcon, BriefcaseIcon, ClipboardDocumentListIcon, ChartPieIcon, ShieldCheckIcon, ArrowLeftIcon } from '../components/icons';

const StatCard = ({ label, value, icon }) => (
    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl flex items-center space-x-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full">
            {React.cloneElement(icon, { className: "w-6 h-6 text-blue-500"})}
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p className="font-bold text-xl dark:text-white">{value}</p>
        </div>
    </div>
);

const getDocumentStatus = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);
    
    const daysUntilExpiry = (expiry.getTime() - today.getTime()) / (1000 * 3600 * 24);

    if (daysUntilExpiry < 0) {
        return { text: 'Expired', color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' };
    }
    if (daysUntilExpiry <= 30) {
        return { text: 'Expiring Soon', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' };
    }
    return { text: 'Valid', color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' };
};

interface CompanyDriverProfileProps {
    driver: any;
    onBack: () => void;
}

const CompanyDriverProfile: React.FC<CompanyDriverProfileProps> = ({ driver, onBack }) => {
    if (!driver) {
        return (
            <div>
                <button onClick={onBack}>&larr; Back to list</button>
                <p>Driver not found.</p>
            </div>
        );
    }
    
    const { performance, documents } = driver;

    return (
        <div className="max-w-4xl mx-auto">
            <button onClick={onBack} className="flex items-center text-gray-600 dark:text-gray-400 font-semibold mb-4 hover:text-black dark:hover:text-white">
                <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back to Drivers List
            </button>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <img src={driver.avatarUrl} alt={driver.name} className="w-24 h-24 rounded-full border-4 border-gray-200 dark:border-gray-700 object-cover"/>
                    <div className="text-center sm:text-left">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{driver.name}</h1>
                        <p className="font-semibold text-blue-600 dark:text-blue-400">{driver.company_name || 'No Company Assigned'}</p>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">{driver.email}</p>
                    </div>
                </div>
                
                {performance && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 pb-6 border-b dark:border-gray-700">
                        <StatCard label="On-Time Rate" value={`${performance.onTimeRate}%`} icon={<ChartPieIcon />} />
                        <StatCard label="Avg. Rating" value={`${performance.averageRating}/5`} icon={<ChartPieIcon />} />
                        <StatCard label="Safety Score" value={`${performance.safetyScore}%`} icon={<ShieldCheckIcon />} />
                        <StatCard label="Assigned Bus" value={driver.assignedBusId || 'None'} icon={<BriefcaseIcon />} />
                    </div>
                )}
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <h3 className="font-bold text-lg dark:text-white mb-2">Contact Information</h3>
                        <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                            <p className="flex items-center"><PhoneIcon className="w-4 h-4 mr-2 text-gray-400"/> {driver.phone}</p>
                            <p className="flex items-center"><EnvelopeIcon className="w-4 h-4 mr-2 text-gray-400"/> {driver.email}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg dark:text-white mb-2">Document Status</h3>
                        {documents && documents.length > 0 ? (
                            <div className="space-y-3">
                                {documents.map((doc: any) => {
                                    const status = getDocumentStatus(doc.expiry);
                                    return (
                                        <div key={doc._id || doc.name} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold text-sm dark:text-white">{doc.name}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Expires: {new Date(doc.expiry).toLocaleDateString()}</p>
                                            </div>
                                            <div className={`px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                                                {status.text}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400">No documents on file.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDriverProfile;