import React, { useState, useMemo } from 'react';
import { 
    BusIcon, SunIcon, MoonIcon, ChartPieIcon, UserGroupIcon, BuildingOfficeIcon, WalletIcon,
    PencilSquareIcon, TrashIcon, ShieldExclamationIcon, CurrencyDollarIcon, TicketIcon, MapIcon,
    ArrowLeftIcon, UsersIcon
} from './components/icons';

interface AdminDashboardProps {
    onLogout: () => void;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
}

// MOCK DATA
const mockPassengers = [
    { id: 'P001', name: 'Kalisa Jean', email: 'kalisa.j@example.com', memberSince: '2023-01-15', status: 'Active', walletBalance: 75500 },
    { id: 'P002', name: 'Umutoni Grace', email: 'grace.u@example.com', memberSince: '2023-03-22', status: 'Active', walletBalance: 12000 },
    { id: 'P003', name: 'Mugisha Felix', email: 'felix.m@example.com', memberSince: '2023-05-10', status: 'Suspended', walletBalance: 0 },
    { id: 'P004', name: 'Ineza Aline', email: 'aline.i@example.com', memberSince: '2023-07-01', status: 'Active', walletBalance: 52300 },
    { id: 'P005', name: 'Nshuti David', email: 'david.n@example.com', memberSince: '2023-09-18', status: 'Active', walletBalance: 8100 },
];

const mockCompanies = [
  { 
    id: 'C02', 
    name: 'Volcano Express', 
    rating: 4.8, 
    totalTrips: 2800, 
    totalRevenue: 45600000,
    totalPassengers: 15890,
    fleetSize: 120,
    activeRoutes: 30,
    contact: { email: 'info@volcano.co.rw', phone: '+250 788 999 888' },
    analytics: {
        income: [
            { period: 'Ejo', amount: 1850000 },
            { period: 'Ejobundi', amount: 1600000 },
            { period: 'Kuwa 3', amount: 1750000 },
            { period: 'Kuwa 2', amount: 2100000 },
            { period: 'Kuwa 1', amount: 2300000 },
            { period: 'Kuwa 6', amount: 1900000 },
            { period: 'Ku cyumweru', amount: 1500000 },
        ],
        tickets: [
            { period: 'Ejo', count: 370 },
            { period: 'Ejobundi', count: 320 },
            { period: 'Kuwa 3', count: 350 },
            { period: 'Kuwa 2', count: 420 },
            { period: 'Kuwa 1', count: 460 },
            { period: 'Kuwa 6', count: 380 },
            { period: 'Ku cyumweru', count: 300 },
        ]
    },
    routes: [
        { from: 'Kigali', to: 'Rubavu', dailyTrips: 25, avgPassengers: 40, revenue: 4500000 },
        { from: 'Kigali', to: 'Musanze', dailyTrips: 30, avgPassengers: 35, revenue: 3675000 },
        { from: 'Kigali', to: 'Huye', dailyTrips: 20, avgPassengers: 42, revenue: 2520000 },
    ],
    fleet: [
        { id: 'V-B001', model: 'Yutong Explorer', capacity: 55, status: 'Active', assignedRoute: 'Kigali - Rubavu' },
        { id: 'V-C012', model: 'Coaster Bus', capacity: 30, status: 'Active', assignedRoute: 'Kigali - Musanze' },
        { id: 'V-B005', model: 'Yutong Explorer', capacity: 55, status: 'Maintenance', assignedRoute: 'N/A' },
    ],
    recentPassengers: [
        { name: 'Mugisha Felix', route: 'Kigali - Rubavu', date: '2024-10-26 08:00' },
        { name: 'Ineza Aline', route: 'Kigali - Musanze', date: '2024-10-26 08:15' },
    ]
  },
  { id: 'C01', name: 'RITCO', rating: 4.5, totalTrips: 1250, totalRevenue: 18750000, totalPassengers: 62500, fleetSize: 85, activeRoutes: 25, contact: { email: 'contact@ritco.rw', phone: '+250 788 123 456' }, analytics: { income: [], tickets: []}, routes: [], fleet: [], recentPassengers: [] },
  { id: 'C03', name: 'Horizon Express', rating: 4.2, totalTrips: 980, totalRevenue: 9850000, totalPassengers: 12000, fleetSize: 50, activeRoutes: 15, contact: { email: 'info@horizon.rw', phone: '+250 788 111 222' }, analytics: { income: [], tickets: []}, routes: [], fleet: [], recentPassengers: [] },
  { id: 'C04', name: 'STELLART', rating: 4.6, totalTrips: 1500, totalRevenue: 19400000, totalPassengers: 18500, fleetSize: 65, activeRoutes: 20, contact: { email: 'info@stellart.rw', phone: '+250 788 333 444' }, analytics: { income: [], tickets: []}, routes: [], fleet: [], recentPassengers: [] },
];

const mockTransactions = [
    { id: 'T001', user: 'Kalisa Jean', type: 'Payment', amount: 9000, date: '2024-10-25 08:15', details: 'Ticket: Kigali -> Rubavu' },
    { id: 'T002', user: 'Umutoni Grace', type: 'Deposit', amount: 20000, date: '2024-10-25 09:30', details: 'Agent Deposit (Nyabugogo)' },
    { id: 'T003', user: 'Ineza Aline', type: 'Payment', amount: 3500, date: '2024-10-24 18:45', details: 'Ticket: Kigali -> Musanze' },
    { id: 'T004', user: 'Kalisa Jean', type: 'Withdrawal', amount: 10000, date: '2024-10-24 15:20', details: 'MoMo Transfer' },
    { id: 'T005', user: 'Nshuti David', type: 'Payment', amount: 6000, date: '2024-10-23 11:05', details: 'Ticket: Huye -> Kigali' },
];

const StatCard: React.FC<{ title: string; value: string; icon: React.FC<{className: string}>; color: string }> = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center space-x-4">
        <div className={`p-4 rounded-full ${color}`}>
            <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);


const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, theme, setTheme }) => {
    const [activeView, setActiveView] = useState('overview');
    const [selectedCompany, setSelectedCompany] = useState<any | null>(null);
    
    const totalRevenue = useMemo(() => mockTransactions.filter(t => t.type === 'Payment').reduce((sum, t) => sum + t.amount, 0), []);
    const totalPassengers = mockPassengers.length;
    const totalCompanies = mockCompanies.length;
    const totalTransactions = mockTransactions.length;

    const handleSelectCompany = (company: any) => {
        setSelectedCompany(company);
    };

    const handleBackToCompanies = () => {
        setSelectedCompany(null);
    }

    const renderContent = () => {
        if (selectedCompany) {
            return <CompanyDetailView company={selectedCompany} onBack={handleBackToCompanies} />;
        }

        switch(activeView) {
            case 'passengers': return <PassengerManagement />;
            case 'companies': return <CompanyManagement onSelectCompany={handleSelectCompany} />;
            case 'transactions': return <TransactionManagement />;
            case 'overview':
            default:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Amafaranga yose yinjiye" value={`${new Intl.NumberFormat('fr-RW').format(totalRevenue)} RWF`} icon={CurrencyDollarIcon} color="bg-green-500" />
                        <StatCard title="Abagenzi Bose" value={totalPassengers.toString()} icon={UserGroupIcon} color="bg-blue-500" />
                        <StatCard title="Ibigo byose" value={totalCompanies.toString()} icon={BuildingOfficeIcon} color="bg-yellow-500" />
                        <StatCard title="Ibikorwa byose" value={totalTransactions.toString()} icon={WalletIcon} color="bg-indigo-500" />
                    </div>
                );
        }
    }

    const NavLink: React.FC<{view: string; label: string; icon: React.FC<{className?: string;}>}> = ({ view, label, icon: Icon }) => (
        <button 
            onClick={() => { setActiveView(view); setSelectedCompany(null); }}
            className={`flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-left transition-colors ${activeView === view && !selectedCompany ? 'bg-blue-600 text-white font-bold' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        >
            <Icon className="w-6 h-6" />
            <span>{label}</span>
        </button>
    );

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex-shrink-0">
                <div className="p-6 flex items-center space-x-3 border-b border-gray-200 dark:border-gray-700">
                    <BusIcon className="h-10 w-10 bg-gradient-to-r from-blue-500 to-yellow-400 p-2 rounded-lg text-white" />
                    <div>
                         <span className="text-xl font-bold text-gray-800 dark:text-white">RWANDA BUS</span>
                         <span className="block text-xs text-yellow-500 font-semibold">ADMIN PANEL</span>
                    </div>
                </div>
                <nav className="p-4 space-y-2">
                    <NavLink view="overview" label="Incāmunigo" icon={ChartPieIcon} />
                    <NavLink view="passengers" label="Abagenzi" icon={UserGroupIcon} />
                    <NavLink view="companies" label="Ibigo" icon={BuildingOfficeIcon} />
                    <NavLink view="transactions" label="Ibikorwa" icon={WalletIcon} />
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white capitalize">
                        {selectedCompany ? `Ibisobanuro bya ${selectedCompany.name}` : activeView.replace('_', ' ')}
                    </h1>
                    <div className="flex items-center space-x-4">
                        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">
                            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
                        </button>
                        <button onClick={onLogout} className="px-4 py-2 rounded-md bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition">
                            Sohoka
                        </button>
                    </div>
                </header>
                {/* Content area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

const ActionButton: React.FC<{icon: React.FC<{className: string}>; color: string; onClick: () => void, text?: string}> = ({ icon: Icon, color, onClick, text }) => (
    <button onClick={onClick} className={`p-2 rounded-md ${color} transition flex items-center space-x-2`}>
        <Icon className="w-5 h-5 text-white" />
        {text && <span className="text-sm font-semibold text-white">{text}</span>}
    </button>
);

const PassengerManagement = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Gucunga Abagenzi</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="text-left text-gray-500 dark:text-gray-400">
                    <tr>
                        <th className="p-3">Amazina</th><th className="p-3">Imeri</th><th className="p-3">Yiyandikishije Kuva</th><th className="p-3">Status</th><th className="p-3 text-right">Ibikorwa</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockPassengers.map(p => (
                        <tr key={p.id} className="dark:text-gray-200">
                            <td className="p-3 font-medium">{p.name}</td>
                            <td className="p-3 text-gray-600 dark:text-gray-400">{p.email}</td>
                            <td className="p-3">{p.memberSince}</td>
                            <td className="p-3">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${p.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}>
                                    {p.status}
                                </span>
                            </td>
                            <td className="p-3 text-right">
                                <div className="flex justify-end space-x-2">
                                    <ActionButton icon={PencilSquareIcon} color="bg-blue-500 hover:bg-blue-600" onClick={() => alert(`Edit ${p.name}`)} />
                                    <ActionButton icon={ShieldExclamationIcon} color="bg-yellow-500 hover:bg-yellow-600" onClick={() => alert(`Suspend ${p.name}`)} />
                                    <ActionButton icon={TrashIcon} color="bg-red-500 hover:bg-red-600" onClick={() => alert(`Delete ${p.name}`)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const CompanyManagement: React.FC<{onSelectCompany: (company: any) => void}> = ({ onSelectCompany }) => (
     <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Gucunga Ibigo</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="text-left text-gray-500 dark:text-gray-400">
                    <tr><th className="p-3">Izina</th><th className="p-3">Amanota</th><th className="p-3">Ingendo zose</th><th className="p-3">Amafaranga yose yinjiye</th><th className="p-3 text-right">Ibikorwa</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockCompanies.map(c => (
                        <tr key={c.id} className="dark:text-gray-200">
                            <td className="p-3 font-medium">{c.name}</td>
                            <td className="p-3 text-yellow-500 font-bold">{c.rating.toFixed(1)}</td>
                            <td className="p-3">{c.totalTrips}</td>
                            <td className="p-3 font-semibold">{new Intl.NumberFormat('fr-RW').format(c.totalRevenue)} RWF</td>
                            <td className="p-3 text-right">
                               <div className="flex justify-end space-x-2">
                                    <ActionButton icon={PencilSquareIcon} color="bg-blue-500 hover:bg-blue-600" onClick={() => onSelectCompany(c)} text="Reba Ibindi" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const TransactionManagement = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Amateka y'Ibikorwa</h2>
         <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="text-left text-gray-500 dark:text-gray-400">
                    <tr><th className="p-3">ID</th><th className="p-3">Umugenzi</th><th className="p-3">Ubwoko</th><th className="p-3">Ibisobanuro</th><th className="p-3">Itariki</th><th className="p-3 text-right">Amafaranga</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockTransactions.map(t => (
                        <tr key={t.id} className="dark:text-gray-200">
                            <td className="p-3 font-mono text-xs">{t.id}</td>
                            <td className="p-3 font-medium">{t.user}</td>
                            <td className="p-3">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${t.type === 'Deposit' ? 'bg-green-100 text-green-800' : t.type === 'Withdrawal' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'} dark:bg-opacity-20`}>
                                    {t.type}
                                </span>
                            </td>
                            <td className="p-3 text-gray-600 dark:text-gray-400">{t.details}</td>
                            <td className="p-3">{t.date}</td>
                            <td className={`p-3 text-right font-bold ${t.type === 'Deposit' ? 'text-green-600' : 'text-red-600'}`}>
                                {t.type === 'Deposit' ? '+' : '-'}{new Intl.NumberFormat('fr-RW').format(t.amount)} RWF
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const CompanyDetailView: React.FC<{ company: any; onBack: () => void }> = ({ company, onBack }) => {
    const maxIncome = Math.max(...company.analytics.income.map((d:any) => d.amount), 1);
    const maxTickets = Math.max(...company.analytics.tickets.map((d:any) => d.count), 1);
    
    const Chart = ({ title, data, dataKey, maxVal, unit }: {title: string; data: any[], dataKey: string, maxVal: number, unit?: string}) => (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-bold mb-4 dark:text-white">{title}</h3>
            <div className="flex items-end h-40 space-x-2 border-l border-b border-gray-200 dark:border-gray-700 pl-2 pb-1">
                {data.map(d => (
                    <div key={d.period} className="flex-1 flex flex-col items-center justify-end group">
                         <div className="text-xs font-bold text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {new Intl.NumberFormat('fr-RW').format(d[dataKey])}{unit}
                        </div>
                        <div className="w-full bg-blue-200 dark:bg-blue-800/80 rounded-t-md hover:bg-blue-300 dark:hover:bg-blue-700 transition-colors" style={{height: `${(d[dataKey] / maxVal) * 100}%`}}></div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{d.period}</div>
                    </div>
                ))}
            </div>
        </div>
    );

    const Table: React.FC<{title: string, headers: string[], data: any[], children: (item: any, index: number) => React.ReactNode}> = ({ title, headers, data, children }) => (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-bold mb-4 dark:text-white">{title}</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-left text-gray-500 dark:text-gray-400">
                        <tr>{headers.map(h => <th key={h} className="p-3 font-semibold">{h}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {data.map(children)}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
    return (
        <div className="space-y-6 animate-fade-in">
            <button onClick={onBack} className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                <ArrowLeftIcon className="w-5 h-5" />
                <span>Subira ku bigo byose</span>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <StatCard title="Amafaranga yose yinjiye" value={`${new Intl.NumberFormat('fr-RW').format(company.totalRevenue)} RWF`} icon={CurrencyDollarIcon} color="bg-green-500" />
                 <StatCard title="Abagenzi Bose" value={new Intl.NumberFormat().format(company.totalPassengers)} icon={UsersIcon} color="bg-blue-500" />
                 <StatCard title="Imodoka zose" value={company.fleetSize} icon={BusIcon} color="bg-yellow-500" />
                 <StatCard title="Ingendo Zikora" value={company.activeRoutes} icon={MapIcon} color="bg-indigo-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Chart title="Amafaranga yinjiye (Icyumweru gishize)" data={company.analytics.income} dataKey="amount" maxVal={maxIncome} unit=" RWF"/>
                <Chart title="Amatike yaguzwe (Icyumweru gishize)" data={company.analytics.tickets} dataKey="count" maxVal={maxTickets} />
            </div>

            <Table title="Ubuyobozi bw'ingendo" headers={['Urugendo', 'Ingendo ku Munsi', 'Abagenzi (avg)', 'Amafaranga Yinjiye']}>
                {(route: any, index: number) => (
                    <tr key={index} className="dark:text-gray-200">
                        <td className="p-3 font-medium">{route.from} &rarr; {route.to}</td>
                        <td className="p-3 text-gray-600 dark:text-gray-400">{route.dailyTrips}</td>
                        <td className="p-3 text-gray-600 dark:text-gray-400">{route.avgPassengers}</td>
                        <td className="p-3 font-semibold">{new Intl.NumberFormat('fr-RW').format(route.revenue)} RWF</td>
                    </tr>
                )}
            </Table>

             <Table title="Imodoka z'Ikigo" headers={['Ikirango', 'Ubwoko', 'Imyanya', 'Status', 'Urugendo']}>
                {(bus: any, index: number) => (
                    <tr key={index} className="dark:text-gray-200">
                        <td className="p-3 font-mono text-xs">{bus.id}</td>
                        <td className="p-3 font-medium">{bus.model}</td>
                        <td className="p-3">{bus.capacity}</td>
                        <td className="p-3">
                             <span className={`px-2 py-1 text-xs font-semibold rounded-full ${bus.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'}`}>
                                {bus.status}
                            </span>
                        </td>
                         <td className="p-3 text-gray-600 dark:text-gray-400">{bus.assignedRoute}</td>
                    </tr>
                )}
            </Table>
        </div>
    )
}


export default AdminDashboard;