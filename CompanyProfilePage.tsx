import React, { useState } from 'react';
import { ClockIcon, MapPinIcon, ChevronRightIcon, BusIcon, WifiIcon, AcIcon, PowerIcon, StarIcon } from './components/icons';
import FleetDetailModal from './components/FleetDetailModal';
import StarRating from './components/StarRating';

const mockCompanyData: { [key: string]: any } = {
  ritco: {
    description: "RITCO ni ikigo cya Leta gishinzwe gutwara abantu mu buryo bwa rusange, kizwiho kugira imodoka nini kandi zigezweho zitwara abantu mu gihugu hose.",
    fleet: [
      { id: 'ritco-1', name: 'Yutong Grand', capacity: 65, image: 'https://images.pexels.com/photos/18413861/pexels-photo-18413861/free-photo-of-a-bus-is-driving-down-a-road-in-the-mountains.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', amenities: ['AC', 'Charging'], images360: ['https://images.pexels.com/photos/2174975/pexels-photo-2174975.jpeg', 'https://images.pexels.com/photos/18413861/pexels-photo-18413861/free-photo-of-a-bus-is-driving-down-a-road-in-the-mountains.jpeg'], specs: { engine: 'Cummins ISL9.5', power: '380 HP', features: 'Air Suspension, Reclining Seats' } },
      { id: 'ritco-2', name: 'Scania Marcopolo', capacity: 70, image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2048&auto=format&fit=crop', amenities: ['AC'], images360: [], specs: { engine: 'Scania DC13', power: '410 HP', features: 'On-board restroom, Extra legroom' } },
    ],
    routes: [ { from: 'Kigali', to: 'Huye', price: '3,000 FRW' }, { from: 'Kigali', to: 'Nyungwe', price: '7,000 FRW' } ],
    reviews: [
        { author: 'Kalisa J.', rating: 5, comment: 'Serivisi nziza cyane! Bisi zirasukuye kandi zigezweho.'},
        { author: 'Umutoni G.', rating: 4, comment: 'Bagerageza kugera ku gihe, ariko interineti ya WiFi ntiyakoraga neza.'},
    ]
  },
  volcano: {
    description: "Volcano Express ni kimwe mu bigo bikunzwe cyane mu Rwanda, kizwiho serivisi nziza, isuku, no kugera ku gihe. Bakorera mu mihanda myinshi ikomeye.",
    fleet: [
      { id: 'volcano-1', name: 'Coaster Bus', capacity: 30, image: 'https://images.pexels.com/photos/385997/pexels-photo-385997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', amenities: ['WiFi', 'AC', 'Charging'], images360: [], specs: { engine: 'Toyota 1HZ', power: '129 HP', features: 'Compact, ideal for smaller groups' } },
      { id: 'volcano-2', name: 'Yutong Explorer', capacity: 55, image: 'https://images.pexels.com/photos/2418491/pexels-photo-2418491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', amenities: ['AC', 'Charging'], images360: [], specs: { engine: 'Weichai WP10', power: '336 HP', features: 'USB charging at every seat' } },
    ],
    routes: [ { from: 'Kigali', to: 'Rubavu', price: '4,500 FRW' }, { from: 'Kigali', to: 'Musanze', price: '3,500 FRW' } ],
    reviews: [
        { author: 'Mugisha F.', rating: 5, comment: 'Nta kundi navuga, Volcano ni abahanga! Buri gihe serivisi ni nziza.'},
    ]
  },
  // Add other companies if needed
};

const defaultCompanyData = {
    description: "Nta makuru ahagije kuri iki kigo araboneka. Tuzayongeramo vuba.",
    fleet: [],
    routes: [],
    reviews: []
}

const AmenityIcon: React.FC<{ amenity: string }> = ({ amenity }) => {
    const iconClass = "w-4 h-4 text-gray-500 dark:text-gray-400";
    if (amenity === 'WiFi') return <WifiIcon className={iconClass} />;
    if (amenity === 'AC') return <AcIcon className={iconClass} />;
    if (amenity === 'Charging') return <PowerIcon className={iconClass} />;
    return null;
};

interface CompanyProfilePageProps {
  company: { id: string, name: string; logoText: string };
  onSelectTrip: (from?: string, to?: string) => void;
}

const CompanyProfilePage: React.FC<CompanyProfilePageProps> = ({ company, onSelectTrip }) => {
  const [selectedBus, setSelectedBus] = useState(null);
  const data = mockCompanyData[company.id] || defaultCompanyData;
  const averageRating = data.reviews.length > 0 ? data.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / data.reviews.length : 0;

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-800 dark:to-green-800">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1616372819235-9b2e1577a2d4?q=80&w=2070&auto=format&fit=crop')" }}></div>
        <div className="container mx-auto px-6 h-full flex items-end pb-8">
            <div className="flex items-center space-x-6">
                <div className="w-28 h-28 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-xl border-4 border-white dark:border-gray-700">
                    <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">{company.logoText}</h1>
                </div>
                <div>
                    <h2 className="text-4xl font-bold text-white shadow-md">{company.name}</h2>
                    <div className="flex items-center space-x-2 mt-1">
                        <StarRating rating={averageRating} />
                        <span className="text-yellow-200 text-sm">({data.reviews.length} ibitekerezo)</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* About Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Abo Turi Bo</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{data.description}</p>
            </div>
            
            {/* Fleet Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Imodoka Zacu</h3>
              {data.fleet.length > 0 ? (
                <div className="flex space-x-6 pb-4 overflow-x-auto custom-scrollbar -mx-6 px-6">
                    {data.fleet.map((bus: any, index: number) => (
                        <button key={index} onClick={() => setSelectedBus(bus)} className="flex-shrink-0 w-72 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform text-left">
                            <img src={bus.image} alt={bus.name} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h4 className="font-bold">{bus.name}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Imyanya: {bus.capacity}</p>
                                <div className="flex space-x-3 mt-2">
                                    {bus.amenities.map((amenity: string) => <AmenityIcon key={amenity} amenity={amenity} />)}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
              ) : <p className="text-gray-500 dark:text-gray-400">Amakuru y'imodoka ntazwi.</p>}
            </div>

             {/* Reviews Section */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Ibitekerezo by'Abakiriya</h3>
              {data.reviews.length > 0 ? (
                <div className="space-y-6">
                    {data.reviews.map((review: any, index: number) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border dark:border-gray-700/50">
                           <div className="flex items-center mb-2">
                               <StarRating rating={review.rating} size="small" />
                               <p className="ml-3 font-bold text-sm text-gray-800 dark:text-gray-200">{review.author}</p>
                           </div>
                           <p className="text-gray-600 dark:text-gray-400 text-sm">"{review.comment}"</p>
                        </div>
                    ))}
                </div>
              ) : <p className="text-gray-500 dark:text-gray-400">Nta bitekerezo biratangwa.</p>}
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 sticky top-24 shadow-lg">
                <button onClick={() => onSelectTrip()} className="w-full mb-6 p-3 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0033A0] font-bold text-lg hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-md">
                    Shakisha Ingendo
                </button>

                <h4 className="text-xl font-bold mb-4 border-b pb-3 dark:border-gray-700 dark:text-white">Ingendo Zikunzwe</h4>
                {data.routes.length > 0 ? (
                    <ul className="space-y-3">
                        {data.routes.map((route: any, index: number) => (
                            <li key={index}>
                                <button onClick={() => onSelectTrip(route.from, route.to)} className="w-full text-left p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex justify-between items-center group">
                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-gray-200">{route.from} - {route.to}</p>
                                        <p className="text-sm text-green-600 dark:text-green-400 font-bold">{route.price}</p>
                                    </div>
                                    <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-transform group-hover:translate-x-1" />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : <p className="text-gray-500 dark:text-gray-400 text-sm">Nta ngendo zizwi.</p>}
            </div>
          </aside>
        </div>
      </div>
      {selectedBus && <FleetDetailModal bus={selectedBus} onClose={() => setSelectedBus(null)} />}
    </div>
  );
};

export default CompanyProfilePage;