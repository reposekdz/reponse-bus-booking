import React, { useState } from 'react';
// FIX: Import ChevronRightIcon
import { ArrowRightIcon, ChevronRightIcon } from './icons';

interface City {
    id: string;
    name: string;
    x: string;
    y: string;
}

const cities: City[] = [
    { id: 'kigali', name: 'Kigali', x: '58%', y: '45%' },
    { id: 'musanze', name: 'Musanze', x: '40%', y: '25%' },
    { id: 'rubavu', name: 'Rubavu', x: '18%', y: '35%' },
    { id: 'huye', name: 'Huye', x: '45%', y: '80%' },
    { id: 'nyungwe', name: 'Nyungwe', x: '25%', y: '85%' },
    { id: 'akagera', name: 'Akagera', x: '85%', y: '55%' },
];

const routes = [
    { from: 'kigali', to: 'rubavu' },
    { from: 'kigali', to: 'musanze' },
    { from: 'kigali', to: 'huye' },
    { from: 'kigali', to: 'akagera' },
    { from: 'huye', to: 'nyungwe' },
    { from: 'musanze', to: 'rubavu' },
];

interface InteractiveMapProps {
    onSearch: (from: string, to: string) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSearch }) => {
    const [selectedCity, setSelectedCity] = useState<City | null>(null);

    const getCityById = (id: string) => cities.find(c => c.id === id);

    const handleCityClick = (city: City) => {
        setSelectedCity(city);
    };

    const relatedRoutes = selectedCity ? routes.filter(r => r.from === selectedCity.id || r.to === selectedCity.id) : [];

    return (
        <section className="py-16 bg-white dark:bg-gray-900 sm:py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">Genzura Ingendo ku Ikarita</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">Kanda ku mujyi kugirango urebe ingendo zihari.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-2 relative aspect-w-4 aspect-h-3">
                        <svg viewBox="0 0 400 300" className="w-full h-full">
                            {/* Simplified Rwanda Map Path */}
                            <path d="M 150,5 L 250,5 L 380,100 L 395,200 L 280,295 L 100,290 L 5,150 L 15,50 Z"
                                fill="#D1FAE5" stroke="#10B981" strokeWidth="2" className="dark:fill-green-900/50 dark:stroke-green-500" />
                            
                            {/* Route Lines */}
                            {routes.map((route, i) => {
                                const fromCity = getCityById(route.from);
                                const toCity = getCityById(route.to);
                                if (!fromCity || !toCity) return null;
                                return (
                                    <line key={i}
                                        x1={fromCity.x} y1={fromCity.y}
                                        x2={toCity.x} y2={toCity.y}
                                        stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="4"
                                        className="dark:stroke-gray-600"
                                    />
                                );
                            })}

                            {/* City Markers */}
                            {cities.map(city => (
                                <g key={city.id} onClick={() => handleCityClick(city)} className="cursor-pointer group">
                                    <circle cx={city.x} cy={city.y} r="8" fill="#10B981" stroke="white" strokeWidth="2"
                                        className="dark:fill-green-400 dark:stroke-gray-900 transition-all duration-300 group-hover:r-12"
                                        style={{ filter: selectedCity?.id === city.id ? 'drop-shadow(0 0 10px #10B981)' : '' }}
                                    />
                                    <text x={city.x} y={city.y} dy="-15" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1F2937" className="dark:fill-gray-200 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                        {city.name}
                                    </text>
                                </g>
                            ))}
                        </svg>
                    </div>
                    <div className="md:col-span-1">
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg shadow-lg h-full min-h-[300px]">
                            <h3 className="font-bold text-lg mb-4">
                                {selectedCity ? `Ingendo ziva/zijya ${selectedCity.name}` : 'Hitamo Umujyi'}
                            </h3>
                            {selectedCity ? (
                                <ul className="space-y-3">
                                    {relatedRoutes.map((route, i) => {
                                        const from = getCityById(route.from);
                                        const to = getCityById(route.to);
                                        return (
                                            <li key={i}>
                                                <button onClick={() => onSearch(from!.name, to!.name)} className="w-full text-left p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex justify-between items-center group">
                                                    <span className="font-semibold">{from!.name} <ArrowRightIcon className="w-4 h-4 inline-block"/> {to!.name}</span>
                                                    <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200" />
                                                </button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">Amakuru y'ingendo azagaragara hano.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveMap;