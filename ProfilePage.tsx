import React, { useState } from 'react';
import { UserCircleIcon, TicketIcon, CogIcon, ShieldCheckIcon, CreditCardIcon, InformationCircleIcon, ArrowRightIcon, WalletIcon, ArrowUpRightIcon, ArrowDownLeftIcon, ChatBubbleLeftRightIcon, BellAlertIcon } from './components/icons';
import StarRating from './components/StarRating';


const user = {
    name: 'Kalisa Jean',
    email: 'kalisa.j@example.com',
    memberSince: 'Mutarama 2023',
};

const userWallet = {
  balance: 75_500,
  currency: 'RWF',
  serialCode: 'KJ7821',
  transactions: [
    { id: 1, type: 'deposit', description: 'Agent Deposit', amount: 50000, date: '25 Ukwakira, 2024', status: 'completed' },
    { id: 2, type: 'payment', description: 'Itike ya Volcano Express', amount: -9000, date: '25 Ukwakira, 2024', status: 'completed' },
    { id: 3, type: 'transfer_out', description: 'Oherejwe kuri UM1234', amount: -10000, date: '22 Ukwakira, 2024', status: 'completed' },
    { id: 4, type: 'payment', description: 'Itike ya RITCO', amount: -7000, date: '18 Ukwakira, 2024', status: 'completed' }
  ]
};

const userReviews = [
    { id: 1, company: 'Volcano Express', rating: 5, date: '28 Nzeri, 2024', comment: 'Serivisi nziza cyane, bisi zirasukuye kandi zigeze ku gihe. Nzakomeza kubagana!'},
    { id: 2, company: 'RITCO', rating: 4, date: '15 Kanama, 2024', comment: 'Urugendo rwari rwiza muri rusange, ariko interineti ya WiFi ntiyakoraga neza.'},
    { id: 3, company: 'Horizon Express', rating: 5, date: '01 Gicurasi, 2024', comment: 'Bisi nziza cyane kandi zihuta. Umushoferi yari umunyamwuga.'},
];


const TabButton: React.FC<{label: string; isActive: boolean; onClick: () => void, icon: React.FC<{className?: string}>}> = ({ label, isActive, onClick, icon: Icon}) => (
    <button onClick={onClick} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 flex items-center space-x-2 ${isActive ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
        <Icon className="w-5 h-5" />
        <span>{label}</span>
    </button>
);

const TransactionIcon: React.FC<{ type: string }> = ({ type }) => {
    const baseClasses = "w-10 h-10 rounded-full flex items-center justify-center mr-4";
    if (type === 'deposit') {
        return <div className={`${baseClasses} bg-green-100 dark:bg-green-900/50`}><ArrowDownLeftIcon className="w-5 h-5 text-green-500" /></div>;
    }
    if (type === 'payment' || type === 'transfer_out') {
         return <div className={`${baseClasses} bg-red-100 dark:bg-red-900/50`}><ArrowUpRightIcon className="w-5 h-5 text-red-500" /></div>;
    }
    return <div className={`${baseClasses} bg-gray-100 dark:bg-gray-700`}><WalletIcon className="w-5 h-5 text-gray-500" /></div>;
}

const SettingToggle: React.FC<{ label: string; description: string; enabled: boolean; onToggle: () => void }> = ({ label, description, enabled, onToggle }) => (
    <div className="flex items-center justify-between py-3">
        <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">{label}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <button onClick={onToggle} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);


const ProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('wallet');
    const [notificationSettings, setNotificationSettings] = useState({
        promotions: true,
        tripReminders: true,
        accountUpdates: false
    });

    const handleToggle = (setting: keyof typeof notificationSettings) => {
        setNotificationSettings(prev => ({...prev, [setting]: !prev[setting]}));
    }

    return (
        <div className="bg-gray-100/50 dark:bg-gray-900/50 min-h-full py-12">
            <div className="container mx-auto px-6">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg flex-shrink-0">
                        KJ
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center sm:text-left">{user.name}</h1>
                        <p className="text-gray-600 dark:text-gray-400 text-center sm:text-left">{user.email}</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                        <div className="flex items-center space-x-2 overflow-x-auto custom-scrollbar pb-2">
                           <TabButton label="Ikofi & Ibikorwa" isActive={activeTab === 'wallet'} onClick={() => setActiveTab('wallet')} icon={WalletIcon} />
                           <TabButton label="Ibisubizo Byanjye" isActive={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')} icon={ChatBubbleLeftRightIcon}/>
                           <TabButton label="Iboneza" isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={CogIcon} />
                        </div>
                    </div>

                    {activeTab === 'wallet' && (
                        <div className="animate-fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-xl shadow-lg">
                                    <p className="text-sm opacity-80">Amafaranga asigaye</p>
                                    <p className="text-4xl font-bold mt-1 mb-4">{new Intl.NumberFormat('fr-RW').format(userWallet.balance)} <span className="text-2xl font-normal opacity-80">{userWallet.currency}</span></p>
                                    <div className="flex space-x-2">
                                        <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition">Bitsa</button>
                                        <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition">Ohereza</button>
                                        <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition">Bikuza</button>
                                    </div>
                                </div>
                                <div className="bg-yellow-100 dark:bg-yellow-900/50 p-6 rounded-xl text-center flex flex-col justify-center">
                                    <p className="text-sm text-yellow-800 dark:text-yellow-300 font-semibold">Kode yawe y'umugenzi</p>
                                    <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-200 tracking-widest my-2">{userWallet.serialCode}</p>
                                    <p className="text-xs text-yellow-700 dark:text-yellow-400">Koresha iyi kode kubitsa amafaranga kuri Agent wemewe.</p>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-4 dark:text-white">Ibikorwa bya Vuba</h3>
                            <ul className="space-y-4">
                               {userWallet.transactions.map((tx) => (
                                    <li key={tx.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <div className="flex items-center">
                                            <TransactionIcon type={tx.type} />
                                            <div>
                                                <p className="font-semibold text-gray-800 dark:text-gray-200">{tx.description}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{tx.date}</p>
                                            </div>
                                        </div>
                                        <p className={`font-bold text-sm ${tx.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-200'}`}>
                                            {tx.amount > 0 ? '+' : ''}{new Intl.NumberFormat('fr-RW').format(tx.amount)}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                     {activeTab === 'reviews' && (
                        <div className="animate-fade-in">
                             <h3 className="text-xl font-bold mb-4 dark:text-white">Ibisubizo watanze</h3>
                             <div className="space-y-4">
                                {userReviews.map(review => (
                                    <div key={review.id} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border dark:border-gray-700">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-bold text-gray-800 dark:text-white">{review.company}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{review.date}</p>
                                            </div>
                                            <StarRating rating={review.rating} size="small" />
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 italic">"{review.comment}"</p>
                                    </div>
                                ))}
                             </div>
                        </div>
                     )}
                    
                    {activeTab === 'settings' && (
                         <div className="animate-fade-in space-y-6">
                            <div>
                                <h3 className="text-lg font-bold mb-2 flex items-center dark:text-white"><UserCircleIcon className="w-5 h-5 mr-2 text-gray-500"/> Konti</h3>
                                <div className="pl-7 divide-y dark:divide-gray-700">
                                    <button className="w-full flex justify-between items-center py-3 text-left group">
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-gray-200">Hindura umwirondoro</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Uzuza amazina yawe, imeri, na telefone</p>
                                        </div>
                                        <ArrowRightIcon className="w-5 h-5 text-gray-400 transform transition-transform group-hover:translate-x-1"/>
                                    </button>
                                     <button className="w-full flex justify-between items-center py-3 text-left group">
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-gray-200">Hindura ijambobanga</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Hindura ijambobanga ryawe buri gihe</p>
                                        </div>
                                        <ArrowRightIcon className="w-5 h-5 text-gray-400 transform transition-transform group-hover:translate-x-1"/>
                                    </button>
                                </div>
                            </div>
                             <div>
                                <h3 className="text-lg font-bold mb-2 flex items-center dark:text-white"><BellAlertIcon className="w-5 h-5 mr-2 text-gray-500"/> Ibimenyetso</h3>
                                 <div className="pl-7 divide-y dark:divide-gray-700">
                                    <SettingToggle label="Promosiyo n'Amashya" description="Akira amakuru y'ibishya n'ibyagabanijwe" enabled={notificationSettings.promotions} onToggle={() => handleToggle('promotions')} />
                                    <SettingToggle label="Kwibutswa ingendo" description="Ubutumwa bwo kukwibutsa mbere y'urugendo" enabled={notificationSettings.tripReminders} onToggle={() => handleToggle('tripReminders')} />
                                    <SettingToggle label="Amakuru ya Konti" description="Ibimenyetso by'ingenzi ku bijyanye na konti yawe" enabled={notificationSettings.accountUpdates} onToggle={() => handleToggle('accountUpdates')} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;