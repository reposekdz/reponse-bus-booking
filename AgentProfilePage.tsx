import React, { useMemo, useState } from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, CalendarIcon, CogIcon, SearchIcon, ArrowDownLeftIcon } from './components/icons';

const StatCard = ({ title, value, format = 'currency' }) => (
    <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">
            {format === 'currency' ? `${new Intl.NumberFormat('fr-RW').format(value)} RWF` : new Intl.NumberFormat().format(value)}
        </p>
    </div>
);


const AgentProfilePage: React.FC<{agent: any; allTransactions: any[]}> = ({ agent, allTransactions }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const agentTransactions = useMemo(() => {
        // In a real app, this would be a filtered API call.
        // Here we simulate it by using the full transaction list.
        return allTransactions.filter(tx => 
            tx.passengerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tx.passengerSerial.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allTransactions, searchTerm]);

    if (!agent) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Agent not found.</p>
            </div>
        )
    }

    return (
        <div className="bg-gray-100/50 dark:bg-gray-900/50 min-h-full py-12">
            <div className="container mx-auto px-6 max-w-6xl">
                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="h-40 bg-green-600"></div>
                     <div className="px-6 pb-6 relative">
                        <div className="flex items-end -mt-16">
                            <img src={agent.avatarUrl} alt={agent.name} className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"/>
                             <div className="ml-6">
                                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{agent.name}</h1>
                                <p className="text-gray-600 dark:text-gray-400">Agent Wemewe</p>
                            </div>
                        </div>
                         <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                            <CogIcon className="w-6 h-6 text-gray-500"/>
                        </button>
                    </div>
                    
                    <div className="p-6 border-t dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                             <h3 className="font-bold text-lg dark:text-white mb-4">Amakuru bwite</h3>
                             <div className="space-y-4">
                                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                                    <p className="flex items-center"><EnvelopeIcon className="w-4 h-4 mr-2 text-gray-400"/> {agent.email}</p>
                                    <p className="flex items-center"><PhoneIcon className="w-4 h-4 mr-2 text-gray-400"/> {agent.phone}</p>
                                    <p className="flex items-center"><MapPinIcon className="w-4 h-4 mr-2 text-gray-400"/> {agent.location}</p>
                                </div>
                                <div className="border-t dark:border-gray-700 pt-4">
                                    <h4 className="font-semibold dark:text-gray-200 mb-2">Performance Analytics</h4>
                                     <div className="grid grid-cols-2 gap-4">
                                        <StatCard title="Total Deposits" value={agent.totalDeposits} />
                                        <StatCard title="Commission Rate" value={`${agent.commissionRate * 100}%`} format="string" />
                                    </div>
                                </div>
                             </div>
                        </div>
                        <div>
                             <h3 className="font-bold text-lg dark:text-white mb-4">Transaction History</h3>
                            <div className="relative mb-4">
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search transactions..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                             <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar pr-2">
                                {agentTransactions.map((tx) => (
                                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full">
                                                <ArrowDownLeftIcon className="w-4 h-4 text-green-500"/>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold dark:text-white">{tx.passengerName}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(tx.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-sm text-green-600 dark:text-green-400">+{new Intl.NumberFormat('fr-RW').format(tx.amount)}</p>
                                            <p className="text-xs text-gray-400">+{new Intl.NumberFormat('fr-RW').format(tx.commission)} comm.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default AgentProfilePage;