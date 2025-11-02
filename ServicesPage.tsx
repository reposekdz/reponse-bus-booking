
import React, { useState, FormEvent } from 'react';
import { Page } from './App';
import { BusIcon, BriefcaseIcon, MapIcon, TruckIcon, ArchiveBoxIcon, ShieldCheckIcon, CreditCardIcon, CheckCircleIcon, ArrowRightIcon } from './components/icons';
import PackageTrackingModal from './PackageTrackingModal';

const allServices = [
    {
      id: 'cargo-logistics',
      title: 'Ohereza Ipaki',
      description: 'Ohereza cyangwa wakire imizigo yawe mu buryo bwizewe.',
      icon: ArchiveBoxIcon,
      isFeatured: true,
    },
    {
      id: 'bus-charter',
      title: 'Kodesha Imodoka',
      description: 'Tegura urugendo rwihariye rw\'itsinda ryawe.',
      icon: BusIcon,
    },
    {
      id: 'corporate-travel',
      title: 'Ingendo z\'Ubucuruzi',
      description: 'Ibisubizo byihariye ku bigo. Fasha abakozi bawe kugenda neza.',
      icon: BriefcaseIcon,
    },
    {
      id: 'tour-packages',
      title: 'Ingendo z\'Ubukerarugendo',
      description: 'Sura ibyiza nyaburanga by\'u Rwanda.',
      icon: MapIcon,
    },
     {
      id: 'travel-insurance',
      title: 'Ubwishingizi bw\'ingendo',
      description: 'Genda amahoro ufite ubwishingizi bwuzuye.',
      icon: ShieldCheckIcon,
    },
    {
      id: 'gift-cards',
      title: 'Amakarita y\'impano',
      description: 'Tanga impano y\'urugendo ku nshuti n\'umuryango.',
      icon: CreditCardIcon,
    },
];

interface ServicesPageProps {
    onNavigate: (page: Page, data?: any) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
    const [trackingId, setTrackingId] = useState('');
    const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);

    const handleTrackPackage = (e: FormEvent) => {
        e.preventDefault();
        if (trackingId) {
            setIsTrackingModalOpen(true);
        }
    }

    return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <header className="bg-white dark:bg-gray-800/50 shadow-sm pt-12 pb-8">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Serivisi zacu zidasanzwe</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                    Byinshi birenze amatike. Turi hano kugira ngo urugendo rwawe rwose rube intangarugero.
                </p>
            </div>
        </header>
        <main className="container mx-auto px-6 py-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
                <h2 className="text-xl font-bold dark:text-white mb-2 flex items-center"><TruckIcon className="w-6 h-6 mr-3 text-blue-500" /> Kurikirana Ipaki Yawe</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Shyiramo nomero yo gukurikirana ipaki yawe kugirango umenye aho igeze.</p>
                <form onSubmit={handleTrackPackage} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <input 
                        type="text" 
                        value={trackingId}
                        onChange={e => setTrackingId(e.target.value.toUpperCase())}
                        placeholder="e.g., PKG-XYZ123" 
                        className="flex-grow p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">Kurikirana</button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allServices.map(service => (
                    <div 
                        key={service.id} 
                        className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${service.isFeatured ? 'md:col-span-2 lg:col-span-3 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20' : ''}`}
                    >
                        <div className={`flex items-start ${service.isFeatured ? 'md:items-center' : ''}`}>
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg mr-4">
                                <service.icon className="w-8 h-8 text-blue-600"/>
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-xl font-bold dark:text-white">{service.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{service.description}</p>
                            </div>
                        </div>
                        <div className="mt-auto pt-4">
                            <button 
                                onClick={() => onNavigate('packageDelivery')}
                                className="w-full text-left font-semibold text-blue-600 dark:text-blue-400 flex items-center group-hover:text-blue-700 dark:group-hover:text-blue-300"
                            >
                                {service.isFeatured ? 'Tangira Nonaha' : 'Menya Ibindi'}
                                <ArrowRightIcon className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1"/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
        {isTrackingModalOpen && <PackageTrackingModal trackingId={trackingId} onClose={() => setIsTrackingModalOpen(false)} />}
    </div>
  );
};

export default ServicesPage;