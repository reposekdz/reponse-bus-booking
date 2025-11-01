import React from 'react';
// FIX: Import StarIcon
import { UserCircleIcon, TicketIcon, GiftIcon, CogIcon, ShieldCheckIcon, CreditCardIcon, InformationCircleIcon, ArrowRightIcon, StarIcon } from './components/icons';

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg text-center">
        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{value}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
);

const ProfilePage: React.FC = () => {
    const user = {
        name: 'Kalisa Jean',
        email: 'kalisa.j@example.com',
        memberSince: 'Mutarama 2023',
    };
    
    const loyalty = {
        points: 1250,
        tier: 'Umugenzi w\'Imena',
        nextTierPoints: 2000,
    };
    
    const recentActivity = [
        { type: 'Booking', description: 'Itike ya Kigali - Rubavu', date: '2 days ago', points: '+50' },
        { type: 'Review', description: 'Igitekerezo kuri Volcano Express', date: '5 days ago', points: '+10' },
        { type: 'Booking', description: 'Itike ya Huye - Musanze', date: '3 weeks ago', points: '+75' },
    ];
    
    const menuItems = [
        { icon: UserCircleIcon, label: 'Amakuru y\'umwirondoro', description: 'Hindura amazina, imeri, n\'ijambobanga' },
        { icon: TicketIcon, label: 'Amateka y\'ingendo', description: 'Reba ingendo zawe zose zarangiye' },
        { icon: CreditCardIcon, label: 'Uburyo bwo Kwishyura', description: 'Gucunga amakarita yawe yishyuza' },
        { icon: ShieldCheckIcon, label: 'Umutekano', description: 'Gucunga iby\'umutekano wa konti' },
        { icon: CogIcon, label: 'Ibyo ukunda', description: 'Hitamo ibyo ukunda mu ngendo' },
        { icon: InformationCircleIcon, label: 'Ubufasha & Inkunga', description: 'Bona ibisubizo by\'ibibazo byawe' },
    ];

    return (
        <div className="bg-gray-100/50 dark:bg-gray-900/50 min-h-full py-12">
            <div className="container mx-auto px-6">
                {/* Profile Header */}
                <div className="flex items-center space-x-6 mb-12">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                        KJ
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{user.name}</h1>
                        <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">Membro kuva {user.memberSince}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Loyalty Program */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold flex items-center"><GiftIcon className="w-6 h-6 mr-3 text-yellow-500" /> Rwanda Miles</h2>
                                <span className="px-3 py-1 text-xs font-bold text-yellow-800 bg-yellow-200 rounded-full">{loyalty.tier}</span>
                            </div>
                            <p className="text-4xl font-bold text-gray-800 dark:text-white">{loyalty.points.toLocaleString()} <span className="text-lg font-normal text-gray-500 dark:text-gray-400">amanota</span></p>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-4">
                                <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${(loyalty.points / loyalty.nextTierPoints) * 100}%` }}></div>
                            </div>
                            <p className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400">Ukeneye {loyalty.nextTierPoints - loyalty.points} amanota kugera ku rwego rukurikira.</p>
                        </div>

                        {/* Travel Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <StatCard value="12" label="Ingendo zose" />
                            <StatCard value="5" label="Ibigo wakoresheje" />
                            <StatCard value="1,850" label="Km wagenze" />
                        </div>
                        
                        {/* Recent Activity */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                             <h2 className="text-xl font-bold mb-4">Ibikorwa bya Vuba</h2>
                             <ul className="space-y-4">
                                {recentActivity.map((activity, index) => (
                                    <li key={index} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${activity.type === 'Booking' ? 'bg-blue-100 dark:bg-blue-900/50' : 'bg-green-100 dark:bg-green-900/50'}`}>
                                                {activity.type === 'Booking' ? <TicketIcon className="w-5 h-5 text-blue-500" /> : <StarIcon className="w-5 h-5 text-green-500" />}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800 dark:text-gray-200">{activity.description}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</p>
                                            </div>
                                        </div>
                                        <p className="font-bold text-sm text-green-600 dark:text-green-400">{activity.points}</p>
                                    </li>
                                ))}
                             </ul>
                        </div>
                    </div>

                    {/* Sidebar Menu */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-2">
                           {menuItems.map((item, index) => (
                                <button key={index} className="w-full flex items-center text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group">
                                    <item.icon className="w-6 h-6 text-gray-500 dark:text-gray-400 mr-4" />
                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-gray-200">{item.label}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                                    </div>
                                    <ArrowRightIcon className="w-5 h-5 text-gray-400 ml-auto transform transition-transform group-hover:translate-x-1" />
                                </button>
                           ))}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;