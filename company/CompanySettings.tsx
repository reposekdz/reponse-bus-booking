
import React from 'react';
import { CogIcon } from '../components/icons';

interface CompanySettingsProps {
    companyData: any;
}

const CompanySettings: React.FC<CompanySettingsProps> = ({ companyData }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold dark:text-gray-200 mb-6">Company Settings</h1>
            <div className="bg-white dark:bg-gray-800/50 p-8 rounded-2xl shadow-lg text-center">
                <CogIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4"/>
                <h2 className="text-xl font-bold dark:text-white">Settings Panel</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">This feature is coming soon. You will be able to edit company details, manage user access, and configure payment settings here.</p>
            </div>
        </div>
    );
};

export default CompanySettings;
