import React, { useState, useRef } from 'react';
import { CogIcon, BuildingOfficeIcon, LockClosedIcon, CameraIcon } from '../components/icons';
import * as api from '../services/apiService';


const SecuritySettings = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }
        setError('');
        setSuccess('');
        setIsLoading(true);
        try {
            await api.updatePassword({ currentPassword, newPassword });
            setSuccess('Password updated successfully!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err.message || 'Failed to update password.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg mt-8">
            <h2 className="text-xl font-bold dark:text-white mb-4 flex items-center"><LockClosedIcon className="w-6 h-6 mr-3 text-red-500"/> Security</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                    <label className="text-xs font-semibold text-gray-500">Current Password</label>
                    <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-semibold text-gray-500">New Password</label>
                        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                     <div>
                        <label className="text-xs font-semibold text-gray-500">Confirm New Password</label>
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
                {success && <p className="text-green-500 text-sm font-semibold">{success}</p>}
                <div className="text-right">
                    <button type="submit" disabled={isLoading} className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
                        {isLoading ? 'Updating...' : 'Update Password'}
                    </button>
                </div>
            </form>
        </div>
    );
};


interface CompanySettingsProps {
    companyData: any;
}

const CompanySettings: React.FC<CompanySettingsProps> = ({ companyData }) => {
    const [formData, setFormData] = useState({
        name: companyData.name || '',
        email: companyData.email || '',
        description: companyData.description || 'Volcano Express is one of the most popular transport companies...',
        logoUrl: companyData.logoUrl || 'https://pbs.twimg.com/profile_images/1237839357116452865/p-28c8o-_400x400.jpg',
        coverUrl: companyData.coverUrl || 'https://images.unsplash.com/photo-1533104816-588941750c11?q=80&w=1974&auto=format&fit=crop',
    });
    
    const logoInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logoUrl' | 'coverUrl') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const url = reader.result as string;
                setFormData(prev => ({...prev, [type]: url}));
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSave = () => {
        // In a real app, this would be an API call
        alert('Company settings saved!');
    };

    return (
        <div>
            <h1 className="text-3xl font-bold dark:text-gray-200 mb-6">Company Settings</h1>
            <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-gray-800/50 p-8 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold dark:text-white mb-6 flex items-center"><BuildingOfficeIcon className="w-6 h-6 mr-3 text-blue-500"/> Company Profile</h2>
                    
                    <div className="space-y-6">
                        {/* Image uploads */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Company Logo</label>
                                <div className="mt-1 flex items-center space-x-4">
                                    <img src={formData.logoUrl} alt="logo" className="w-20 h-20 rounded-full object-contain bg-gray-100 p-1"/>
                                    <button type="button" onClick={() => logoInputRef.current?.click()} className="text-sm font-semibold text-blue-600 hover:underline">Change Logo</button>
                                    <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'logoUrl')} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Cover Image</label>
                                <div className="mt-1 relative group w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
                                     <img src={formData.coverUrl} alt="cover" className="w-full h-full object-cover"/>
                                     <button onClick={() => coverInputRef.current?.click()} className="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        <CameraIcon className="w-6 h-6"/>
                                    </button>
                                    <input type="file" ref={coverInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'coverUrl')} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</label>
                            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                         <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Contact Email</label>
                            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                         <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Public Description</label>
                            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                    </div>
                    <div className="text-right mt-6">
                        <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                            Save Changes
                        </button>
                    </div>
                </div>

                <SecuritySettings />
            </div>
        </div>
    );
};

export default CompanySettings;