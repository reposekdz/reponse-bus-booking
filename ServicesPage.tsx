import React, { useState, FormEvent } from 'react';
import { Page } from './App';
import { ArchiveBoxIcon, BusIcon, BriefcaseIcon, MapIcon, ShieldCheckIcon, CreditCardIcon, ChevronRightIcon, TruckIcon } from './components/icons';
import PackageTrackingModal from './PackageTrackingModal';

const allServices = [
    {
      id: 'cargo-logistics',
      title: 'Ohereza Ipaki',
      description: 'Ohereza cyangwa wakire imizigo yawe mu buryo bwizewe.',
      icon: ArchiveBoxIcon,
      page: 'packageDelivery',
      isFeatured: true,
    },
    {
      id: 'bus-charter',
      title: 'Kodesha Imodoka',
      description: 'Tegura urugendo rwihariye rw\'itsinda ryawe.',
      icon: BusIcon,
      page: 'busCharter',
      isFeatured: true,
    },
    {
      id: 'corporate-travel',
      title: 'Ingendo z\'Ubucuruzi',
      description: 'Ibisubizo byihariye ku bigo.',
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
      description: 'Tanga impano y\'urugendo ku nshuti.',
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
    };
    
    const handleServiceClick = (service: typeof allServices[0]) => {
        if (service.page) {
            onNavigate(service.page as Page);
        } else {
            alert(`Serivisi ya "${service.title}" izaza vuba!`);
        }
    };

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
            {/* Track Package */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-12 max-w-2xl mx-auto">
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
            
            {/* All Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allServices.map(service => (
                    <button 
                        key={service.id} 
                        onClick={() => handleServiceClick(service)}
                        className={`w-full p-6 rounded-xl text-left flex items-start space-x-4 group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${service.isFeatured ? 'bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-2 border-blue-200 dark:border-blue-700' : 'bg-white dark:bg-gray-800'}`}
                    >
                        <div className={`flex-shrink-0 p-3 rounded-lg ${service.isFeatured ? 'bg-blue-100 dark:bg-blue-900/50' : 'bg-gray-100 dark:bg-gray-700'}`}>
                            <service.icon className={`w-8 h-8 ${service.isFeatured ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300'}`} />
                        </div>
                        <div className="flex-grow">
                            <p className="font-bold text-lg text-gray-800 dark:text-white">{service.title}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{service.description}</p>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-gray-400 flex-shrink-0 transform transition-transform group-hover:translate-x-1 mt-1" />
                    </button>
                ))}
            </div>
        </main>
        {isTrackingModalOpen && <PackageTrackingModal trackingId={trackingId} onClose={() => setIsTrackingModalOpen(false)} />}
    </div>
  );
};

export default ServicesPage;