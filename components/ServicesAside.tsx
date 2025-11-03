import React from 'react';
import { Page } from '../App';
import { XIcon, ChevronRightIcon, ArchiveBoxIcon, BusIcon, BriefcaseIcon, MapIcon, ShieldCheckIcon, CreditCardIcon } from './icons';

interface ServicesAsideProps {
    isOpen: boolean;
    onClose: () => void;
    navigate: (page: Page, data?: any) => void;
}

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


const ServicesAside: React.FC<ServicesAsideProps> = ({ isOpen, onClose, navigate }) => {

    const handleServiceClick = (service: typeof allServices[0]) => {
        onClose();
        // Add a delay to allow the closing animation to finish
        setTimeout(() => {
            if (service.page) {
                navigate(service.page as Page);
            } else {
                alert(`Serivisi ya "${service.title}" izaza vuba!`);
            }
        }, 300);
    };

    return (
        <div 
            className={`fixed inset-0 z-[60] transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <aside 
                className={`absolute top-0 left-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                onClick={e => e.stopPropagation()}
            >
                <header className="p-4 border-b dark:border-gray-700 flex items-center justify-between flex-shrink-0">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Serivisi Zacu</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </header>

                <div className="flex-grow overflow-y-auto custom-scrollbar p-4">
                    <div className="space-y-3">
                         {allServices.map(service => (
                            <button 
                                key={service.id} 
                                onClick={() => handleServiceClick(service)}
                                className={`w-full p-4 rounded-xl text-left flex items-center space-x-4 group transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${service.isFeatured ? 'bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-2 border-blue-200 dark:border-blue-700' : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/80'}`}
                            >
                                <div className={`flex-shrink-0 p-3 rounded-lg ${service.isFeatured ? 'bg-blue-100 dark:bg-blue-900/50' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                    <service.icon className={`w-7 h-7 ${service.isFeatured ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300'}`} />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-bold text-gray-800 dark:text-white">{service.title}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{service.description}</p>
                                </div>
                                <ChevronRightIcon className="w-5 h-5 text-gray-400 flex-shrink-0 transform transition-transform group-hover:translate-x-1" />
                            </button>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default ServicesAside;