
import React, { useState, useEffect } from 'react';
import { BriefcaseIcon, SearchIcon, PlusIcon, PencilSquareIcon, TrashIcon, EyeIcon, ArrowUpTrayIcon } from '../components/icons';
import Modal from '../components/Modal';
import { Page } from '../App';

const mockAgents = [
    { id: 'a1', name: 'Jane Smith', email: 'jane.s@agent.rw', phone: '0788777888', location: 'Nyabugogo', commissionRate: 0.05, totalDeposits: 2500000, status: 'Active', avatarUrl: 'https://randomuser.me/api/portraits/women/5.jpg' },
    { id: 'a2', name: 'Peter Kamari', email: 'peter.k@agent.rw', phone: '0788999000', location: 'Remera', commissionRate: 0.05, totalDeposits: 1800000, status: 'Active', avatarUrl: 'https://randomuser.me/api/portraits/men/7.jpg' }
];

const AgentForm = ({ agent, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        commissionRate: 0.05,
        status: 'Active',
        avatarUrl: '',
        ...agent
    });
    const [avatarPreview, setAvatarPreview] = useState(formData.avatarUrl);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarPreview(reader.result as string);
                setFormData(prev => ({ ...prev, avatarUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-4">
                <img src={avatarPreview || 'https://randomuser.me/api/portraits/lego/3.jpg'} alt="Avatar" className="w-20 h-20 rounded-full object-cover bg-gray-200"/>
                <div>
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm font-semibold text-blue-600 hover:underline">Upload Photo</button>
                    <p className="text-xs text-gray-500">PNG or JPG. Max 2MB.</p>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Agent Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" required />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Commission Rate (%)</label>
                <input type="number" name="commissionRate" value={formData.commissionRate * 100} onChange={e => setFormData(prev => ({...prev, commissionRate: parseFloat(e.target.value) / 100}))} step="0.1" className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-semibold border rounded-lg dark:border-gray-600">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Agent</button>
            </div>
        </form>
    );
};

const ManageAgents: React.FC<{ navigate: (page: Page, data?: any) => void; }> = ({ navigate }) => {
    const [agents, setAgents] = useState(mockAgents);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAgent, setCurrentAgent] = useState<any | null>(null);
    const [liveStatuses, setLiveStatuses] = useState({});

    useEffect(() => {
        const statusOptions = ['Online', 'Idle', 'Offline'];
        const updateStatuses = () => {
            const newStatuses = {};
            agents.forEach(agent => {
                newStatuses[agent.id] = statusOptions[Math.floor(Math.random() * statusOptions.length)];
            });
            setLiveStatuses(newStatuses);
        };
        updateStatuses();
        const interval = setInterval(updateStatuses, 15000); // Update every 15s
        return () => clearInterval(interval);
    }, [agents]);

    const openModal = (agent = null) => {
        setCurrentAgent(agent);
        setIsModalOpen(true);
    };

    const handleSave = (agentData) => {
        if (currentAgent) {
            setAgents(agents.map(a => a.id === currentAgent.id ? { ...a, ...agentData } : a));
        } else {
            setAgents([...agents, { ...agentData, id: `agent-${Date.now()}`, totalDeposits: 0 }]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this agent?")) {
            setAgents(agents.filter(a => a.id !== id));
        }
    };
    
    const statusIndicator = (status) => {
        switch(status) {
            case 'Online': return 'bg-green-500';
            case 'Idle': return 'bg-yellow-500';
            case 'Offline': return 'bg-gray-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold dark:text-gray-200 mb-6">Manage Agents</h1>
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
                 <div className="flex justify-between items-center mb-4">
                    <div className="relative w-full max-w-xs">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search agents..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                    <button onClick={() => openModal()} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
                        <PlusIcon className="w-5 h-5 mr-2" /> Add Agent
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="p-3">Agent Name</th>
                                <th className="p-3">Location</th>
                                <th className="p-3">Commission Rate</th>
                                <th className="p-3">Total Deposits</th>
                                <th className="p-3">Live Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agents.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase())).map(agent => (
                                <tr key={agent.id} className="border-t dark:border-gray-700">
                                    <td className="p-3 font-semibold dark:text-white flex items-center">
                                        <img src={agent.avatarUrl} alt={agent.name} className="w-8 h-8 rounded-full object-cover mr-3"/>
                                        {agent.name}
                                    </td>
                                    <td>{agent.location}</td>
                                    <td>{agent.commissionRate * 100}%</td>
                                    <td>{new Intl.NumberFormat('fr-RW').format(agent.totalDeposits)} RWF</td>
                                    <td>
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-2.5 h-2.5 rounded-full ${statusIndicator(liveStatuses[agent.id])}`}></div>
                                            <span className="text-xs font-medium">{liveStatuses[agent.id]}</span>
                                        </div>
                                    </td>
                                    <td className="flex space-x-1 p-3">
                                        <button onClick={() => navigate('agentProfile', agent)} className="p-1 text-gray-500 hover:text-green-600" title="View Profile"><EyeIcon className="w-5 h-5"/></button>
                                        <button onClick={() => openModal(agent)} className="p-1 text-gray-500 hover:text-blue-600" title="Edit"><PencilSquareIcon className="w-5 h-5"/></button>
                                        <button onClick={() => handleDelete(agent.id)} className="p-1 text-gray-500 hover:text-red-600" title="Delete"><TrashIcon className="w-5 h-5"/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentAgent ? "Edit Agent" : "Add New Agent"}>
                <AgentForm agent={currentAgent} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default ManageAgents;
