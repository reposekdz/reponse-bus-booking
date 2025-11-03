
import React from 'react';
import { Page } from './App';
import { UserCircleIcon, TicketIcon, ClockIcon, WalletIcon, CogIcon, ChevronRightIcon, PencilSquareIcon } from './components/icons';

interface ProfilePageProps {
    onNavigate: (page: Page) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
    // Mock user data
    const user = {
        name: 'Kalisa Jean',
        email: 'kalisa.j@example.com',
        avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
        memberSince: 'Mutarama 2023',
        walletBalance: '15,000 RWF',
    };

    // FIX: Explicitly type the menuItems array to ensure `item.page` is of type `Page`.
    const menuItems: { label: string, icon: React.FC<any>, page: Page }[] = [
        { label: 'Amatike Yanjye', icon: TicketIcon, page: 'bookings' },
        { label: 'Ingendo ziteganijwe', icon: ClockIcon, page: 'scheduled' },
        { label: 'Ikofi Yanjye', icon: WalletIcon, page: 'profile' }, // Stays on profile for demo
        { label: 'Iboneza', icon: CogIcon, page: 'profile' }, // Stays on profile for demo
    ];

    return (
        <div className="bg-gray-100/50 dark:bg-gray-900/50 min-h-screen">
            <header className="bg-white dark:bg-gray-800 shadow-sm pt-12 pb-24">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Umwirondoro Wanjye</h1>
                </div>
            </header>
            <main className="container mx-auto px-6 -mt-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="relative">
                         <img src={user.avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-700" />
                         <button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-700 border-2 border-white">
                             <PencilSquareIcon className="w-4 h-4"/>
                         </button>
                    </div>
                    <div className="flex-grow text-center sm:text-left">
                        <h2 className="text-2xl font-bold dark:text-white">{user.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                        <p className="text-xs text-gray-400 mt-1">Yabaye umunyamuryango: {user.memberSince}</p>
                    </div>
                    <div className="text-center sm:text-right">
                         <p className="text-sm text-gray-500 dark:text-gray-400">Amafaranga asigaye</p>
                         <p className="text-2xl font-bold text-green-600 dark:text-green-400">{user.walletBalance}</p>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {menuItems.map(item => (
                         <button key={item.label} onClick={() => onNavigate(item.page)} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center justify-between hover:shadow-lg hover:-translate-y-1 transition-all">
                             <div className="flex items-center">
                                 <item.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                                 <span className="ml-4 font-semibold text-lg text-gray-800 dark:text-white">{item.label}</span>
                             </div>
                             <ChevronRightIcon className="w-6 h-6 text-gray-400" />
                         </button>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;