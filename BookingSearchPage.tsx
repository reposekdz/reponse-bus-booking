
import React, { useState } from 'react';
import { ArrowRightIcon, FilterIcon, LocationMarkerIcon, CalendarIcon, UserCircleIcon } from './components/icons';
import SearchResultsPage from './SearchResultsPage';
import AdBanner from './components/AdBanner';
import FareCalendar from './components/FareCalendar';

interface BookingSearchPageProps {
  onSearch: (from: string, to: string) => void;
}

const locations = ['Kigali', 'Rubavu', 'Musanze', 'Huye', 'Rusizi', 'Nyagatare', 'Muhanga'];

const BookingSearchPage: React.FC<BookingSearchPageProps> = ({ onSearch }) => {
  const [fromLocation, setFromLocation] = useState('Kigali');
  const [toLocation, setToLocation] = useState('Rubavu');
  const [journeyDate, setJourneyDate] = useState(new Date().toISOString().split('T')[0]);
  const [returnDate, setReturnDate] = useState('');
  const [tripType, setTripType] = useState('one-way');
  const [passengers, setPassengers] = useState(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(fromLocation, toLocation);
  };
  
  const swapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <header className="bg-white dark:bg-gray-800/50 shadow-sm pt-12 pb-24">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Gushakisha Urugendo</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Bona urugendo rwiza kuri wowe.</p>
                
                {/* ADVANCED SEARCH FORM */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mt-6 relative z-10">
                    <div className="flex space-x-4 border-b dark:border-gray-700 pb-4 mb-4">
                        <button onClick={() => setTripType('one-way')} className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${tripType === 'one-way' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>Urugendo Rumwe</button>
                        <button onClick={() => setTripType('round-trip')} className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${tripType === 'round-trip' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>Kugenda no Kugaruka</button>
                    </div>
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
                        <div className="lg:col-span-3 relative">
                            <label className="text-xs font-semibold text-gray-500">Uva</label>
                            <select value={fromLocation} onChange={e => setFromLocation(e.target.value)} className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-yellow-500 focus:border-yellow-500">
                                {locations.map(l => <option key={`from-${l}`}>{l}</option>)}
                            </select>
                        </div>

                         <div className="lg:col-span-3 relative">
                            <label className="text-xs font-semibold text-gray-500">Ujya</label>
                            <select value={toLocation} onChange={e => setToLocation(e.target.value)} className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-yellow-500 focus:border-yellow-500">
                                {locations.map(l => <option key={`to-${l}`}>{l}</option>)}
                            </select>
                        </div>

                        <div className="lg:col-span-2 relative">
                            <label className="text-xs font-semibold text-gray-500">Itariki yo Kugenda</label>
                            <input type="date" value={journeyDate} onChange={e => setJourneyDate(e.target.value)} className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                        <div className={`lg:col-span-2 relative transition-opacity ${tripType === 'one-way' ? 'opacity-50' : 'opacity-100'}`}>
                            <label className="text-xs font-semibold text-gray-500">Itariki yo Kugaruka</label>
                            <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" disabled={tripType === 'one-way'} />
                        </div>

                        <div className="lg:col-span-2">
                            <button type="submit" className="w-full py-2.5 bg-yellow-400 text-[#0033A0] font-semibold rounded-lg hover:bg-yellow-500 transition shadow-md">Shakisha</button>
                        </div>
                    </form>
                </div>
            </div>
      </header>
       <main className="container mx-auto px-6 py-8 -mt-12">
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           <aside className="lg:col-span-1">
             <div className="sticky top-24 space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold dark:text-white mb-4 flex items-center"><FilterIcon className="w-5 h-5 mr-2"/> Sefa Ibindi</h3>
                    <p className="text-sm text-gray-500">Filter options (by price, time, etc.) coming soon.</p>
                </div>
             </div>
           </aside>
           <div className="lg:col-span-3">
               <SearchResultsPage onTripSelect={() => {}} />
           </div>
         </div>
       </main>
    </div>
  );
};

export default BookingSearchPage;
