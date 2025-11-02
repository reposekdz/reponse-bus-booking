import React, { useState, useMemo, ChangeEvent } from 'react';
import {
    SunIcon, MoonIcon, BellIcon, UserCircleIcon, CogIcon, UsersIcon, ChartBarIcon, BuildingOfficeIcon,
    BusIcon, MapIcon, PencilSquareIcon, TrashIcon, PlusIcon, ArrowUpTrayIcon, XIcon
} from './components/icons';

interface CompanyDashboardProps {
    onLogout: () => void;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    companyData: any;
}

const StatCard = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md flex items-center space-x-4">
        <div className="p-3 bg-blue-100 dark:bg-gray-700 rounded-lg">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {typeof value === 'number' ? new Intl.NumberFormat('fr-RW').format(value) : value}
            </p>
        </div>
    </div>
);

const ProfileManagement = ({ company, onUpdate }) => {
    const [formData, setFormData] = useState(company);
    const [logoPreview, setLogoPreview] = useState<string | null>(company.logoUrl);
    const [coverPreview, setCoverPreview] = useState<string | null>(company.coverUrl);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'logo' | 'cover') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if(type === 'logo') setLogoPreview(reader.result as string);
                if(type === 'cover') setCoverPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        onUpdate({ ...formData, logoUrl: logoPreview, coverUrl: coverPreview }); // In a real app, this would be an API call
        alert('Profile updated successfully!');
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Manage Profile</h1>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 dark:text-white">Update Cover Photo</h3>
                        <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg group">
                            {coverPreview && <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover rounded-lg" />}
                            <label htmlFor="cover-upload" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <ArrowUpTrayIcon className="w-8 h-8 text-white"/>
                            </label>
                            <input id="cover-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'cover')} />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4 dark:text-white">Update Company Logo</h3>
                        <div className="flex items-center space-x-4">
                            <div className="relative w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full group flex-shrink-0">
                                {logoPreview && <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover rounded-full" />}
                                <label htmlFor="logo-upload" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                                    <ArrowUpTrayIcon className="w-6 h-6 text-white"/>
                                </label>
                                <input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'logo')} />
                            </div>
                            <p className="text-sm text-gray-500">Upload a new logo. Recommended size: 200x200px.</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4 dark:text-white">Company Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium dark:text-gray-300">Company Name</label>
                                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
                            </div>
                            <div>
                                <label className="text-sm font-medium dark:text-gray-300">Contact Email</label>
                                <input type="email" value={formData.contactEmail} disabled className="w-full mt-1 p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 cursor-not-allowed"/>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium dark:text-gray-300">Description</label>
                                <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"></textarea>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

const BusFormModal = ({ bus, onSave, onClose }) => {
    const [formData, setFormData] = useState(bus);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 max-w-md w-full">
                <h3 className="text-lg font-bold mb-4 dark:text-white">{bus.id.startsWith('New-') ? 'Add New Bus' : 'Edit Bus Details'}</h3>
                <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-4">
                    <div>
                        <label className="text-sm dark:text-gray-300">Bus Model</label>
                        <input name="model" value={formData.model} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" required />
                    </div>
                    <div>
                        <label className="text-sm dark:text-gray-300">Capacity</label>
                        <input name="capacity" type="number" value={formData.capacity} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" required />
                    </div>
                    <div>
                        <label className="text-sm dark:text-gray-300">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                            <option>Active</option>
                            <option>Maintenance</option>
                            <option>Out of Service</option>
                        </select>
                    </div>
                     <div>
                        <label className="text-sm dark:text-gray-300">Assigned Route</label>
                        <input name="assignedRoute" value={formData.assignedRoute} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <div className="flex justify-end space-x-4 pt-4 border-t dark:border-gray-700">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg dark:border-gray-600">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const FleetManagement = ({ fleet, onUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBus, setEditingBus] = useState(null);

    const openModal = (bus = null) => {
        setEditingBus(bus || { id: `New-${Date.now()}`, model: '', capacity: '', status: 'Active', assignedRoute: '-' });
        setIsModalOpen(true);
    };

    const handleSave = (bus) => {
        const newFleet = editingBus.id.startsWith('New-')
            ? [...fleet, bus]
            : fleet.map(b => b.id === bus.id ? bus : b);
        onUpdate(newFleet);
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this bus?')) {
            onUpdate(fleet.filter(b => b.id !== id));
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Manage Your Fleet</h1>
                <button onClick={() => openModal()} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                    <PlusIcon className="w-5 h-5 mr-2" /> Add Bus
                </button>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Model</th>
                                <th className="px-4 py-3">Capacity</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Assigned Route</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fleet.map(bus => (
                                <tr key={bus.id} className="border-b dark:border-gray-700">
                                    <td className="px-4 py-2 font-medium dark:text-white">{bus.id}</td>
                                    <td className="px-4 py-2">{bus.model}</td>
                                    <td className="px-4 py-2">{bus.capacity}</td>
                                    <td className="px-4 py-2"><span className={`px-2 py-1 text-xs rounded-full ${bus.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{bus.status}</span></td>
                                    <td className="px-4 py-2">{bus.assignedRoute}</td>
                                    <td className="px-4 py-2 text-right">
                                        <button onClick={() => openModal(bus)} className="p-1 text-gray-500 hover:text-blue-600"><PencilSquareIcon className="w-5 h-5"/></button>
                                        <button onClick={() => handleDelete(bus.id)} className="p-1 text-gray-500 hover:text-red-600"><TrashIcon className="w-5 h-5"/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && <BusFormModal bus={editingBus} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};


const CompanyDashboard: React.FC<CompanyDashboardProps> = ({ onLogout, theme, setTheme, companyData }) => {
    const [view, setView] = useState('dashboard');
    const [company, setCompany] = useState(companyData);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    const handleUpdate = (updatedData) => {
        // In a real app, this would be an API call to update the data.
        // For this mock, we just update the state.
        setCompany(prev => ({ ...prev, ...updatedData }));
    };

    const renderContent = () => {
        switch (view) {
            case 'dashboard':
                return (
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Dashboard</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                           <StatCard title="Total Revenue" value={company.totalRevenue} icon={<ChartBarIcon className="w-6 h-6 text-blue-500" />} />
                           <StatCard title="Total Passengers" value={company.totalPassengers} icon={<UsersIcon className="w-6 h-6 text-blue-500" />} />
                           <StatCard title="Fleet Size" value={company.fleetSize} icon={<BusIcon className="w-6 h-6 text-blue-500" />} />
                           <StatCard title="Active Routes" value={company.routes.length} icon={<MapIcon className="w-6 h-6 text-blue-500" />} />
                        </div>
                    </div>
                );
            case 'profile':
                return <ProfileManagement company={company} onUpdate={handleUpdate} />;
            case 'fleet':
                return <FleetManagement fleet={company.fleetDetails} onUpdate={(newFleet) => handleUpdate({ fleetDetails: newFleet, fleetSize: newFleet.length })} />;
            // Add other views like 'routes', 'passengers' here
            default:
                 return (
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Dashboard</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                           <StatCard title="Total Revenue" value={company.totalRevenue} icon={<ChartBarIcon className="w-6 h-6 text-blue-500" />} />
                           <StatCard title="Total Passengers" value={company.totalPassengers} icon={<UsersIcon className="w-6 h-6 text-blue-500" />} />
                           <StatCard title="Fleet Size" value={company.fleetSize} icon={<BusIcon className="w-6 h-6 text-blue-500" />} />
                           <StatCard title="Active Routes" value={company.routes.length} icon={<MapIcon className="w-6 h-6 text-blue-500" />} />
                        </div>
                    </div>
                );
        }
    };

    const NavLink = ({ viewName, label, icon: Icon }) => (
        <button onClick={() => setView(viewName)} className={`w-full flex items-center px-4 py-3 transition-colors duration-200 ${view === viewName ? 'text-white bg-gray-700' : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'} rounded-md`}>
            <Icon className="w-5 h-5 mr-3" />
            <span>{label}</span>
        </button>
    );

    return (
        <div className={`min-h-screen flex ${theme}`}>
            <aside className="w-64 bg-gray-800 text-gray-300 flex-col hidden lg:flex">
                <div className="h-16 flex items-center justify-center text-white font-bold text-xl border-b border-gray-700">
                    COMPANY PORTAL
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <NavLink viewName="dashboard" label="Dashboard" icon={ChartBarIcon} />
                    <NavLink viewName="profile" label="Profile" icon={BuildingOfficeIcon} />
                    <NavLink viewName="fleet" label="Fleet" icon={BusIcon} />
                    <NavLink viewName="routes" label="Routes" icon={MapIcon} />
                    <NavLink viewName="passengers" label="Passengers" icon={UsersIcon} />
                    <NavLink viewName="settings" label="Settings" icon={CogIcon} />
                </nav>
            </aside>

            <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900">
                <header className="h-16 bg-white dark:bg-gray-800 shadow-md flex items-center justify-between px-6">
                    <div className="text-gray-800 dark:text-white font-bold">{company.name}</div>
                    <div className="flex items-center space-x-4">
                        <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400">
                            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
                        </button>
                        <button onClick={onLogout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                            Logout
                        </button>
                    </div>
                </header>

                <main className="flex-1 p-6 overflow-y-auto">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default CompanyDashboard;