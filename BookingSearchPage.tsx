import React, { useState, useMemo, useEffect } from 'react';
import { ArrowRightIcon, FilterIcon, StarIcon, WifiIcon, AcIcon, PowerIcon, BuildingOfficeIcon } from './components/icons';
import SearchResultsPage from './SearchResultsPage';
import { Page } from './App';
import * as api from './services/apiService';
import SearchResultSkeleton from './components/SearchResultSkeleton';
// FIX: Removed broken import. Company data will be fetched from the API.

const allAmenities = ['WiFi', 'AC', 'Charging'];

interface BookingSearchPageProps {
  searchParams: { from?: string; to?: string; date?: string; };
  onNavigate: (page: Page, data?: any) => void;
}

const BookingSearchPage: React.FC<BookingSearchPageProps> = ({ searchParams, onNavigate }) => {
  const [fromLocation, setFromLocation] = useState(searchParams?.from || 'Kigali');
  const [toLocation, setToLocation] = useState(searchParams?.to || 'Rubavu');
  const [journeyDate, setJourneyDate] = useState(searchParams?.date || new Date().toISOString().split('T')[0]);

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [companies, setCompanies] = useState<any[]>([]);
  
  const [sortOrder, setSortOrder] = useState('fastest');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favoriteTripIds, setFavoriteTripIds] = useState<string[]>([]);
  const [amenityFilters, setAmenityFilters] = useState<string[]>([]);
  const [companyFilters, setCompanyFilters] = useState<string[]>([]);
  const [timeFilters, setTimeFilters] = useState<string[]>([]);

  const fetchTrips = async () => {
      if (!fromLocation || !toLocation || !journeyDate) return;
      setIsLoading(true);
      setError('');
      try {
          const data = await api.searchTrips(fromLocation, toLocation, journeyDate);
          setResults(data);
      } catch (err) {
          setError(err.message || 'Failed to fetch trips.');
      } finally {
          setIsLoading(false);
      }
  };
  
  useEffect(() => {
    fetchTrips();
    const fetchCompanies = async () => {
        try {
            const companyData = await api.getCompanies();
            setCompanies(companyData);
        } catch (e) {
            console.error("Failed to fetch companies for filter", e);
        }
    };
    fetchCompanies();
  }, [fromLocation, toLocation, journeyDate]);

  const loadFavorites = () => {
    const storedFavorites = localStorage.getItem('favoriteTrips');
    setFavoriteTripIds(storedFavorites ? JSON.parse(storedFavorites) : []);
  };
  
  useEffect(() => {
    loadFavorites();
    window.addEventListener('favoritesChanged', loadFavorites);
    return () => window.removeEventListener('favoritesChanged', loadFavorites);
  }, []);

  const toggleFavorite = (tripId: string) => {
    const newFavorites = favoriteTripIds.includes(tripId)
      ? favoriteTripIds.filter(id => id !== tripId)
      : [...favoriteTripIds, tripId];
    
    setFavoriteTripIds(newFavorites);
    localStorage.setItem('favoriteTrips', JSON.stringify(newFavorites));
    // Dispatch a custom event so other components on the same page can react in real-time
    window.dispatchEvent(new CustomEvent('favoritesChanged'));
  };

  const handleFilterToggle = (filterList, setFilterList, value) => {
    if (filterList.includes(value)) {
      setFilterList(filterList.filter(item => item !== value));
    } else {
      setFilterList([...filterList, value]);
    }
  };

  const filteredAndSortedResults = useMemo(() => {
    let processedResults = results
      .map(trip => ({
          id: trip._id,
          company: trip.route.company.name,
          departureTime: new Date(trip.departureTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
          arrivalTime: new Date(trip.arrivalTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
          durationMinutes: trip.route.estimatedDurationMinutes,
          basePrice: trip.route.basePrice,
          dynamicPrice: trip.route.basePrice, // Can add dynamic logic here later
          availableSeats: Object.values(trip.seatMap).filter(s => s === 'available').length,
          amenities: trip.bus.amenities,
          driver: trip.driver ? {
            name: trip.driver.name,
            avatarUrl: trip.driver.avatarUrl,
          } : null,
      }))
      .filter(trip => {
        if (showFavoritesOnly && !favoriteTripIds.includes(trip.id)) return false;
        if (amenityFilters.length > 0 && !amenityFilters.every(amenity => trip.amenities.includes(amenity))) return false;
        if (companyFilters.length > 0 && !companyFilters.includes(trip.company)) return false;
        if (timeFilters.length > 0) {
            const hour = parseInt(trip.departureTime.split(':')[0]);
            const morning = hour >= 5 && hour < 12;
            const afternoon = hour >= 12 && hour < 18;
            const evening = hour >= 18;
            if (timeFilters.includes('Morning') && !morning) return false;
            if (timeFilters.includes('Afternoon') && !afternoon) return false;
            if (timeFilters.includes('Evening') && !evening) return false;
        }
        return true;
      });

    processedResults.sort((a, b) => {
      switch (sortOrder) {
        case 'cheapest': return a.dynamicPrice - b.dynamicPrice;
        case 'fastest': return a.durationMinutes - b.durationMinutes;
        case 'earliest': return a.departureTime.localeCompare(b.departureTime);
        default: return 0;
      }
    });

    return processedResults;
  }, [results, sortOrder, showFavoritesOnly, favoriteTripIds, amenityFilters, companyFilters, timeFilters]);


  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <header className="bg-white dark:bg-gray-800/50 shadow-sm pt-12 pb-24">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{fromLocation} <ArrowRightIcon className="inline w-8 h-8 mx-2"/> {toLocation}</h1>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{journeyDate}, {isLoading ? '...' : `${filteredAndSortedResults.length} trips found`}</p>
                    </div>
                </div>
            </div>
      </header>
       <main className="container mx-auto px-6 py-8 -mt-20">
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           <aside className="lg:col-span-1">
             <div className="sticky top-24 space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold dark:text-white flex items-center mb-4"><FilterIcon className="w-5 h-5 mr-2"/> Filters</h3>
                    
                    <div className="border-b dark:border-gray-700 pb-4">
                        <h4 className="font-semibold mb-2 dark:text-gray-200">Sort by</h4>
                        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                            <option value="fastest">Fastest</option>
                            <option value="cheapest">Cheapest</option>
                            <option value="earliest">Earliest Departure</option>
                        </select>
                    </div>
                    
                    <div className="border-b dark:border-gray-700 py-4">
                        <h4 className="font-semibold mb-2 dark:text-gray-200">Amenities</h4>
                        <div className="space-y-2">
                            {allAmenities.map(amenity => (
                                <label key={amenity} className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" onChange={() => handleFilterToggle(amenityFilters, setAmenityFilters, amenity)} className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"/><span>{amenity}</span></label>
                            ))}
                        </div>
                    </div>

                     <div className="border-b dark:border-gray-700 py-4">
                        <h4 className="font-semibold mb-2 dark:text-gray-200">Departure Time</h4>
                        <div className="space-y-2">
                            {['Morning (5am-12pm)', 'Afternoon (12pm-6pm)', 'Evening (6pm-onwards)'].map(time => (
                                <label key={time} className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" onChange={() => handleFilterToggle(timeFilters, setTimeFilters, time.split(' ')[0])} className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"/><span>{time}</span></label>
                            ))}
                        </div>
                    </div>
                    
                    <div className="border-b dark:border-gray-700 py-4">
                        <h4 className="font-semibold mb-2 dark:text-gray-200">Bus Companies</h4>
                        <div className="space-y-2">
                            {companies.map(company => (
                                <label key={company._id} className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" onChange={() => handleFilterToggle(companyFilters, setCompanyFilters, company.name)} className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"/><span>{company.name}</span></label>
                            ))}
                        </div>
                    </div>

                    <div className="py-4">
                        <label className="flex items-center justify-between cursor-pointer">
                            <h4 className="font-semibold dark:text-gray-200 flex items-center"><StarIcon className="w-5 h-5 mr-2 text-yellow-400"/> Show Favorites Only</h4>
                             <div className="relative">
                                <input type="checkbox" checked={showFavoritesOnly} onChange={() => setShowFavoritesOnly(!showFavoritesOnly)} className="sr-only" />
                                <div className={`block w-10 h-6 rounded-full transition ${showFavoritesOnly ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${showFavoritesOnly ? 'transform translate-x-4' : ''}`}></div>
                            </div>
                        </label>
                    </div>
                </div>
             </div>
           </aside>
           <div className="lg:col-span-3">
               {isLoading && <SearchResultSkeleton />}
               {error && <p className="text-red-500">{error}</p>}
               {!isLoading && !error && <SearchResultsPage 
                  results={filteredAndSortedResults} 
                  onTripSelect={(trip) => onNavigate('seatSelection', { tripId: trip.id })}
                  favoriteTripIds={favoriteTripIds}
                  onToggleFavorite={toggleFavorite}
                />}
           </div>
         </div>
       </main>
    </div>
  );
};

export default BookingSearchPage;