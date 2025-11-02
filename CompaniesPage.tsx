import React, { useState, useMemo } from 'react';
import StarRating from './components/StarRating';
import { SearchIcon, ChevronRightIcon, StarIcon } from './components/icons';
import type { Page } from './App';

interface CompaniesPageProps {
  onNavigate: (page: Page, data?: any) => void;
}

const companies = [
  { id: 'ritco', name: 'RITCO', rating: 4.5, reviews: 120, logoText: 'RITCO' },
  { id: 'volcano', name: 'Volcano Express', rating: 4.8, reviews: 250, logoText: 'VOLCANO' },
  { id: 'horizon', name: 'Horizon Express', rating: 4.2, reviews: 98, logoText: 'HORIZON' },
  { id: 'onatra', name: 'ONATRACOM', rating: 3.9, reviews: 75, logoText: 'ONATRA' },
  { id: 'stellart', name: 'STELLART', rating: 4.6, reviews: 150, logoText: 'STELLART' },
  { id: 'select', name: 'SELECT', rating: 4.1, reviews: 60, logoText: 'SELECT' },
];

const CompanyCard: React.FC<{ company: typeof companies[0], onSelect: () => void }> = ({ company, onSelect }) => (
    <button 
        onClick={onSelect} 
        className="w-full text-left bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex items-center space-x-5 border-2 border-transparent hover:border-blue-500/50 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
    >
        <div className="flex-shrink-0 h-20 w-20 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center shadow-inner">
            <p className="font-bold text-blue-800 dark:text-gray-200 tracking-widest text-base">{company.logoText}</p>
        </div>
        <div className="flex-grow">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{company.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
                <StarRating rating={company.rating} />
                <span className="text-sm text-yellow-500 font-bold">{company.rating.toFixed(1)}</span>
            </div>
             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{company.reviews} ibitekerezo</p>
        </div>
        <div className="flex-shrink-0">
            <ChevronRightIcon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
        </div>
    </button>
);

const CompaniesPage: React.FC<CompaniesPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('rating_desc');
  const [ratingFilter, setRatingFilter] = useState(0);

  const filteredAndSortedCompanies = useMemo(() => {
    return companies
      .filter(company => 
          company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          company.rating >= ratingFilter
      )
      .sort((a, b) => {
        switch (sortOrder) {
          case 'rating_desc':
            return b.rating - a.rating;
          case 'rating_asc':
            return a.rating - b.rating;
          case 'name_asc':
            return a.name.localeCompare(b.name);
          case 'name_desc':
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
  }, [searchTerm, sortOrder, ratingFilter]);
  
  const featuredCompanies = useMemo(() => companies.filter(c => c.rating >= 4.5), []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
       <header className="bg-white dark:bg-gray-800/50 shadow-sm pt-12 pb-8">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Ibigo Twizera Dukorana</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                    Dukorana n'ibigo bya bisi by'imena mu Rwanda kugira ngo tukwizere urugendo rwiza kandi rutekanye.
                </p>
            </div>
        </header>
        <main className="container mx-auto px-6 py-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                 <aside className="lg:w-1/4 xl:w-1/5">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
                             <div className="relative mb-4">
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Shakisha ikigo..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold dark:text-gray-300">Tondeka</label>
                                <select 
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="mt-1 w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-yellow-500"
                                >
                                    <option value="rating_desc">Ku manota (menshi)</option>
                                    <option value="rating_asc">Ku manota (make)</option>
                                    <option value="name_asc">Ku izina (A-Z)</option>
                                    <option value="name_desc">Ku izina (Z-A)</option>
                                </select>
                            </div>
                             <div className="mt-4">
                                <label className="text-sm font-semibold dark:text-gray-300">Amanota (min)</label>
                                <div className="flex items-center space-x-2 mt-1">
                                    <input
                                        type="range"
                                        min="0"
                                        max="5"
                                        step="0.5"
                                        value={ratingFilter}
                                        onChange={(e) => setRatingFilter(parseFloat(e.target.value))}
                                        className="w-full"
                                    />
                                    <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">{ratingFilter.toFixed(1)} <StarIcon className="w-4 h-4 inline-block -mt-1"/></span>
                                </div>
                            </div>
                        </div>
                         <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
                             <h3 className="text-lg font-bold mb-4 dark:text-white">Ibigo by'Imena</h3>
                             <div className="space-y-3">
                                {featuredCompanies.map(c => (
                                    <button key={c.id} onClick={() => onNavigate('companyProfile', c)} className="w-full text-left flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50">
                                        <div className="w-10 h-10 bg-blue-100 dark:bg-gray-700 rounded-full flex-shrink-0 flex items-center justify-center text-blue-800 dark:text-gray-200 font-bold text-xs">{c.logoText}</div>
                                        <div>
                                            <p className="font-semibold text-sm dark:text-gray-200">{c.name}</p>
                                            <p className="text-xs text-yellow-500">{c.rating} stars</p>
                                        </div>
                                    </button>
                                ))}
                             </div>
                         </div>
                    </div>
                 </aside>
                <section className="lg:w-3/4 xl:w-4/5">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredAndSortedCompanies.length > 0 ? (
                        filteredAndSortedCompanies.map(company => (
                          <CompanyCard key={company.id} company={company} onSelect={() => onNavigate('companyProfile', company)} />
                        ))
                      ) : (
                        <p className="md:col-span-2 text-center text-gray-500 dark:text-gray-400">Nta kigo gihuye n'ishakisha ryawe.</p>
                      )}
                    </div>
                </section>
            </div>
        </main>
    </div>
  );
};

export default CompaniesPage;