
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRightIcon, WifiIcon, AcIcon, PowerIcon, StarIcon, FilterIcon, ChevronDownIcon, ClockIcon } from './components/icons';
import SearchResultSkeleton from './components/SearchResultSkeleton';
import BookingForm from './components/BookingForm';

const searchResultsData = [
  { id: 1, company: 'Volcano Express', departureTime: '07:00 AM', arrivalTime: '10:30 AM', duration: '3h 30m', price: 4500, availableSeats: 23, amenities: ['WiFi', 'AC'], rating: 4.8, tag: 'Ikunzwe Cyane', logoUrl: 'https://seeklogo.com/images/V/volcano-express-logo-F735513A51-seeklogo.com.png' },
  { id: 2, company: 'Horizon Express', departureTime: '08:30 AM', arrivalTime: '12:15 PM', duration: '3h 45m', price: 4800, availableSeats: 15, amenities: ['AC', 'Charging'], rating: 4.5, logoUrl: 'https://media.jobinrwanda.com/logo/horizon-express-ltd-1681284534.png' },
  { id: 3, company: 'RITCO', departureTime: '09:00 AM', arrivalTime: '12:30 PM', duration: '3h 30m', price: 4500, availableSeats: 0, amenities: ['WiFi', 'AC', 'Charging'], rating: 4.2, tag: 'Byuzuye', logoUrl: 'https://www.ritco.rw/wp-content/uploads/2021/03/logo.svg' },
  { id: 4, company: 'Volcano Express', departureTime: '11:00 AM', arrivalTime: '02:30 PM', duration: '3h 30m', price: 4500, availableSeats: 5, amenities: ['AC'], rating: 4.8, logoUrl: 'https://seeklogo.com/images/V/volcano-express-logo-F735513A51-seeklogo.com.png' },
  { id: 5, company: 'STELLART', departureTime: '06:00 AM', arrivalTime: '09:45 AM', duration: '3h 45m', price: 4700, availableSeats: 10, amenities: ['Charging'], rating: 4.6, logoUrl: '' },
  { id: 6, company: 'RITCO', departureTime: '13:00 PM', arrivalTime: '04:30 PM', duration: '3h 30m', price: 4500, availableSeats: 18, amenities: ['WiFi', 'AC'], rating: 4.2, logoUrl: 'https://www.ritco.rw/wp-content/uploads/2021/03/logo.svg' },
];

interface BookingSearchPageProps {
  onTripSelect: (trip: any) => void;
  initialSearch?: { from?: string; to?: string };
}

const AmenityIcon: React.FC<{ amenity: string }> = ({ amenity }) => {
    const iconClass = "w-4 h-4 text-gray-500 dark:text-gray-400";
    if (amenity === 'WiFi') return <WifiIcon className={iconClass} title="WiFi" />;
    if (amenity === 'AC') return <AcIcon className={iconClass} title="Air Conditioning" />;
    if (amenity === 'Charging') return <PowerIcon className={iconClass} title="Charging Ports" />;
    return null;
};

const SearchResultCard: React.FC<{ result: any, onSelect: () => void }> = ({ result, onSelect }) => (
    <button onClick={onSelect} disabled={result.availableSeats === 0} className="w-full text-left bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6 transform hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 relative disabled:opacity-60 disabled:cursor-not-allowed">
        {result.tag && (
            <div className={`absolute top-0 left-6 -translate-y-1/2 text-xs font-bold px-3 py-1 rounded-full shadow-md ${result.tag === 'Byuzuye' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
                {result.tag}
            </div>
        )}
        <div className="flex items-center space-x-4">
            {result.logoUrl ? <img src={result.logoUrl} alt={result.company} className="w-12 h-12 object-contain bg-gray-100 rounded-full p-1"/> : <div className="w-12 h-12 bg-gray-200 rounded-full"></div>}
            <div>
                <p className="font-bold text-gray-800 dark:text-gray-200 text-lg">{result.company}</p>
                <div className="flex items-center space-x-1 mt-1">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{result.rating}</span>
                     <div className="flex items-center space-x-2 ml-3">
                        {result.amenities.map((amenity: string) => <AmenityIcon key={amenity} amenity={amenity} />)}
                    </div>
                </div>
            </div>
        </div>
        <div className="flex items-center space-x-4">
            <div className="text-center">
                <p className="font-bold text-xl text-gray-800 dark:text-white">{result.departureTime}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{result.from || 'Kigali'}</p>
            </div>
            <div className="text-center text-gray-400">
                <p className="text-xs flex items-center"><ClockIcon className="w-3 h-3 mr-1"/>{result.duration}</p>
                <div className="w-20 h-0.5 bg-gray-300 dark:bg-gray-600 my-1"></div>
            </div>
            <div className="text-center">
                <p className="font-bold text-xl text-gray-800 dark:text-white">{result.arrivalTime}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{result.to || 'Rubavu'}</p>
            </div>
        </div>
        <div className="flex items-center space-x-4">
            <div className="text-center sm:text-right">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{new Intl.NumberFormat('fr-RW').format(result.price)} <span className="text-sm font-normal">RWF</span></p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{result.availableSeats > 0 ? `hasigaye imyanya ${result.availableSeats}` : 'Imyanya yose yafashwe'}</p>
            </div>
            <div className="hidden sm:block">
                 <ArrowRightIcon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
            </div>
        </div>
    </button>
);


const BookingSearchPage: React.FC<BookingSearchPageProps> = ({ onTripSelect, initialSearch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        setResults(searchResultsData);
        setIsLoading(false);
    }, 1000);
  }, []);

  const fromCity = initialSearch?.from || "Kigali";
  const toCity = initialSearch?.to || "Rubavu";

  return (
    <div className="bg-gray-100/50 dark:bg-gray-900/50 min-h-full">
        <header className="bg-white dark:bg-gray-800/50 shadow-sm py-8">
            <div className="container mx-auto px-6">
                 <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Ibyavuye mu Gushakisha</h1>
                 <p className="text-gray-600 dark:text-gray-400 mt-1">{fromCity} <ArrowRightIcon className="inline w-4 h-4"/> {toCity} - 28 Ukwakira, 2024</p>
            </div>
        </header>

        <main className="container mx-auto px-6 py-8">
            <div className="space-y-6">
                {isLoading ? <SearchResultSkeleton count={4} /> : (
                    results.length > 0 ? results.map(result => (
                        <SearchResultCard 
                            key={result.id} 
                            result={{...result, from: fromCity, to: toCity}} 
                            onSelect={() => onTripSelect({...result, from: fromCity, to: toCity})}
                        />
                    )) : (
                        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg">
                            <h2 className="text-xl font-bold">Nta ngendo zibonetse</h2>
                            <p className="text-gray-500 mt-2">Gerageza guhindura aho uva, aho ujya, cyangwa itariki.</p>
                        </div>
                    )
                )}
            </div>
        </main>
    </div>
  );
};

export default BookingSearchPage;
