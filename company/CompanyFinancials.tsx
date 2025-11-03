
import React from 'react';
import { WalletIcon } from '../components/icons';

const CompanyFinancials: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold dark:text-gray-200 mb-6">Financial Overview</h1>
            <div className="bg-white dark:bg-gray-800/50 p-8 rounded-2xl shadow-lg text-center">
                 <WalletIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4"/>
                <h2 className="text-xl font-bold dark:text-white">Financials Dashboard</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">This feature is coming soon. You will be able to view detailed revenue reports, manage driver payouts, and track financial performance here.</p>
            </div>
        </div>
    );
};

export default CompanyFinancials;
