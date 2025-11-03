
import React, { useState } from 'react';
import { UsersIcon, SearchIcon, PlusIcon, PencilSquareIcon, TrashIcon } from '../components/icons';
import Modal from '../components/Modal';

const DriverForm = ({ driver, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        assignedBusId: '',
        status: 'Active',
        ...driver
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Driver Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" required />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" required />
            </div>
             <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assigned Bus ID</label>
                    <input type="text" name="assignedBusId" value={formData.assignedBusId} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                    <select name="status" value={formData.status} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                        <option>Active</option>
                        <option>On Leave</option>
                        <option>Inactive</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-semibold border rounded-lg dark:border-gray-600">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Driver</button>
            </div>
        </form>
    );
};

// FIX: Define props interface to accept `drivers` from the parent component.
interface CompanyDriversProps {
    companyId: string;
    drivers: any[];
    crudHandlers: any;
}

const CompanyDrivers: React.FC<CompanyDriversProps> = ({ companyId, drivers: initialDrivers }) => {
    const [drivers, setDrivers] = useState(initialDrivers);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDriver, setCurrentDriver] = useState<any | null>(null);

    const openModal = (driver = null) => {
        setCurrentDriver(driver);
        setIsModalOpen(true);
    };

    const handleSave = (driverData) => {
        if (currentDriver) {
            setDrivers(drivers.map(d => d.id === currentDriver.id ? { ...d, ...driverData } : d));
        } else {
            setDrivers([...drivers, { ...driverData, id: `driver-${Date.now()}`, companyId }]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this driver?")) {
            setDrivers(drivers.filter(d => d.id !== id));
        }
    };
    
    return (
        <div>
            <h1 className="text-3xl font-bold dark:text-gray-200 mb-6">Manage Drivers</h1>
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
                 <div className="flex justify-between items-center mb-4">
                    <div className="relative w-full max-w-xs">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or phone..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                    <button onClick={() => openModal()} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
                        <PlusIcon className="w-5 h-5 mr-2" /> Add Driver
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="p-3">Driver Name</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Assigned Bus</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drivers.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.phone.includes(searchTerm)).map(driver => (
                                <tr key={driver.id} className="border-t dark:border-gray-700">
                                    <td className="p-3 font-semibold dark:text-white">{driver.name}</td>
                                    <td>{driver.phone}</td>
                                    <td>{driver.assignedBusId}</td>
                                    <td>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${driver.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'}`}>
                                            {driver.status}
                                        </span>
                                    </td>
                                    <td className="flex space-x-2 p-3">
                                        <button onClick={() => openModal(driver)} className="p-1 text-gray-500 hover:text-blue-600"><PencilSquareIcon className="w-5 h-5"/></button>
                                        <button onClick={() => handleDelete(driver.id)} className="p-1 text-gray-500 hover:text-red-600"><TrashIcon className="w-5 h-5"/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentDriver ? "Edit Driver" : "Add New Driver"}>
                <DriverForm driver={currentDriver} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default CompanyDrivers;