import React from 'react';
import { BusIcon, ArrowRightIcon } from './components/icons';

// A new icon for Cargo/Parcels
const ArchiveBoxIcon: React.FC<{className?: string}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);

// A new icon for Corporate/Briefcase
const BriefcaseIcon: React.FC<{className?: string}> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.125c0 1.393-1.128 2.523-2.523 2.523H6.273c-1.395 0-2.523-1.13-2.523-2.523v-4.125m16.5 0a2.523 2.523 0 00-2.523-2.523H6.273a2.523 2.523 0 00-2.523 2.523m16.5 0v-4.125c0-1.393-1.128-2.523-2.523-2.523H6.273c-1.395 0-2.523 1.13-2.523 2.523v4.125" />
    </svg>
);

// A new icon for Tourism/Map
const MapIcon: React.FC<{className?: string}> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.5-10.5h-7A2.25 2.25 0 006 8.25v9.75A2.25 2.25 0 008.25 21h7.5A2.25 2.25 0 0018 18V8.25A2.25 2.25 0 0015.75 6" />
    </svg>
);


interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  backgroundImage: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, backgroundImage }) => (
  <div className="group relative rounded-xl overflow-hidden shadow-2xl transform hover:-translate-y-2 transition-transform duration-300">
    <img src={backgroundImage} alt={title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
    <div className="relative p-8 flex flex-col h-full justify-end text-white">
      <div className="w-16 h-16 mb-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-lg flex items-center justify-center">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold mb-2" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>{title}</h3>
      <p className="text-gray-200 mb-6 flex-grow">{description}</p>
      <button className="self-start flex items-center font-semibold text-yellow-300 hover:text-white transition-colors">
        Saba amakuru <ArrowRightIcon className="w-4 h-4 ml-2" />
      </button>
    </div>
  </div>
);

const ServicesPage: React.FC = () => {
  const services = [
    {
      title: 'Kodesha Imodoka',
      description: 'Tegura urugendo rwihariye rw\'itsinda ryawe. Dukodesha bisi zigezweho ku birori, ingendo z\'amashuri, n\'ibindi.',
      icon: BusIcon,
      backgroundImage: 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?q=80&w=2070&auto=format&fit=crop',
    },
    {
      title: 'Gutwara Ibintu',
      description: 'Ohereza cyangwa wakire imizigo yawe mu buryo bwizewe kandi bwihuse ukoresheje umuyoboro wacu wagutse mu gihugu hose.',
      icon: ArchiveBoxIcon,
      backgroundImage: 'https://images.unsplash.com/photo-1587293852726-70cdb120c546?q=80&w=2070&auto=format&fit=crop',
    },
    {
      title: 'Ingendo z\'Ubucuruzi',
      description: 'Ibisubizo byihariye ku bigo. Fasha abakozi bawe kugenda neza kandi ku giciro cyiza.',
      icon: BriefcaseIcon,
      backgroundImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
    },
    {
      title: 'Ingendo z\'Ubukerarugendo',
      description: 'Sura ibyiza nyaburanga by\'u Rwanda. Dufite ingendo zateguwe zikugeza muri pariki n\'ahandi nyaburanga.',
      icon: MapIcon,
      backgroundImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2070&auto=format&fit=crop',
    },
  ];

  return (
    <div className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Serivisi zacu</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Twaguriye serivisi zacu kugira ngo zigere ku byo ukenera byose mu ngendo.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;