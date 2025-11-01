import React, { useState } from 'react';
import { BusIcon, ArrowRightIcon, BriefcaseIcon, MapIcon, SparklesIcon, TruckIcon } from './components/icons';
import { ArchiveBoxIcon } from './components/icons';
import ServiceRequestModal from './components/ServiceRequestModal';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  backgroundImage: string;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, backgroundImage, onClick }) => (
  <div className="group relative rounded-xl overflow-hidden shadow-2xl transform hover:-translate-y-2 transition-transform duration-300">
    <img src={backgroundImage} alt={title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
    <div className="relative p-8 flex flex-col h-full justify-end text-white">
      <div className="w-16 h-16 mb-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-lg flex items-center justify-center">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold mb-2" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>{title}</h3>
      <p className="text-gray-200 mb-6 flex-grow">{description}</p>
      <button onClick={onClick} className="self-start flex items-center font-semibold text-yellow-300 hover:text-white transition-colors">
        Saba amakuru <ArrowRightIcon className="w-4 h-4 ml-2" />
      </button>
    </div>
  </div>
);

const ServicesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Omit<ServiceCardProps, 'onClick'> | null>(null);

  const handleServiceClick = (service: Omit<ServiceCardProps, 'onClick'>) => {
      setSelectedService(service);
      setIsModalOpen(true);
  };

  const services: Omit<ServiceCardProps, 'onClick'>[] = [
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
     {
      title: 'Ibicuba by\'Agaciro',
      description: 'Tegereza urugendo rwawe ahantu heza kandi hatuje. Kata umwanya muri salo zacu z\'icyubahiro ku ma gare akomeye.',
      icon: SparklesIcon,
      backgroundImage: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop',
    },
    {
      title: 'Serivisi yo Gutwara Abantu',
      description: 'Tugutwara kuva kuri gare tukugeza iwawe cyangwa kuri hoteli. Serivisi yacu irizewe kandi irihuta.',
      icon: TruckIcon,
      backgroundImage: 'https://images.unsplash.com/photo-1574642436034-a4a33f377a83?q=80&w=1964&auto=format&fit=crop',
    },
  ];

  return (
    <div className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Serivisi zacu zidasanzwe</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Twaguriye serivisi zacu kugira ngo zigere ku byo ukenera byose mu ngendo, kuva ku mizigo kugeza ku kwakira abantu neza.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} onClick={() => handleServiceClick(service)} />
          ))}
        </div>
      </div>
      {isModalOpen && <ServiceRequestModal service={selectedService} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default ServicesPage;