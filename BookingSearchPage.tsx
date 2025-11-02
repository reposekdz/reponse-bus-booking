import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import { ClockIcon, ArrowRightIcon } from './components/icons';

interface BookingSearchPageProps {
    onSearch: (from?: string, to?: string) => void;
}

const featuredRoutes = [
    { from: 'Kigali', to: 'Rubavu', image: 'https://images.unsplash.com/photo-1590632313655-e9c5220c4273?q=80&w=2070&auto=format&fit=crop' },
    { from: 'Kigali', to: 'Huye', image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Ethnographic_Museum_of_Rwanda.jpg' },
    { from: 'Kigali', to: 'Musanze', image: 'https://www.andbeyond.com/wp-content/uploads/sites/5/one-of-the-reasons-to-visit-rwanda-gorilla.jpg' },
    { from: 'Kigali', to: 'Nyungwe', image: 'https://nyungwepark.com/wp-content/uploads/2021/04/Nyungwe-Forest-National-Park.jpg' }
];

type RecentSearch = {
    from: string;
    to: string;
};

const BookingSearchPage: React.FC<BookingSearchPageProps> = ({ onSearch }) => {
    const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

    useEffect(() => {
        const storedSearches = localStorage.getItem('rwandaBusRecentSearches');
        if (storedSearches) {
            setRecentSearches(JSON.parse(storedSearches));
        }
    }, []);

    const handleSearch = (from?: string, to?: string) => {
        if (from && to) {
            const newSearch = { from, to };
            const updatedSearches = [newSearch, ...recentSearches.filter(s => s.from !== from || s.to !== to)].slice(0, 5);
            setRecentSearches(updatedSearches);
            localStorage.setItem('rwandaBusRecentSearches', JSON.stringify(updatedSearches));
        }
        onSearch(from, to);
    };

    return (
        <div className="bg-gray-100/50 dark:bg-gray-900/50 min-h-full py-12">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Kata Itike Yawe Hano</h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Bona urugendo rwawe rutaha mu Rwanda mu buryo bworoshye.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-600 to-green-600 dark:from-gray-800 dark:to-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20 text-white">
                        <SearchForm onSearch={handleSearch} />
                    </div>

                    {recentSearches.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                                <ClockIcon className="w-6 h-6 mr-3 text-blue-500" />
                                Iheruka Gushakishwa
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {recentSearches.map((search, index) => (
                                    <button 
                                        key={index}
                                        onClick={() => handleSearch(search.from, search.to)}
                                        className="px-4 py-2 bg-white dark:bg-gray-700/50 border dark:border-gray-600 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
                                    >
                                        {search.from} <ArrowRightIcon className="inline w-4 h-4 mx-1" /> {search.to}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Ingendo Zikunzwe</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredRoutes.map(route => (
                                <button 
                                    key={`${route.from}-${route.to}`} 
                                    onClick={() => handleSearch(route.from, route.to)}
                                    className="group relative block w-full h-48 rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform duration-300"
                                >
                                    <img src={route.image} alt={`View of ${route.to}`} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-4">
                                        <p className="font-bold text-white text-lg drop-shadow-md">{route.from} - {route.to}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingSearchPage;
