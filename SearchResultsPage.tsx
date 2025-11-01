import React from 'react';
import { ArrowRightIcon } from './components/icons';

const searchResults = [
  { id: 1, company: 'Volcano Express', departureTime: '07:00 AM', arrivalTime: '10:30 AM', duration: '3h 30m', price: 14.00, availableSeats: 23 },
  { id: 2, company: 'Horizon Express', departureTime: '08:30 AM', arrivalTime: '12:15 PM', duration: '3h 45m', price: 15.50, availableSeats: 15 },
  { id: 3, company: 'RITCO', departureTime: '09:00 AM', arrivalTime: '12:30 PM', duration: '3h 30m', price: 14.00, availableSeats: 30 },
  { id: 4, company: 'Volcano Express', departureTime: '11:00 AM', arrivalTime: '02:30 PM', duration: '3h 30m', price: 14.00, availableSeats: 5 },
];

interface SearchResultsPageProps {
  onTripSelect: (trip: any) => void;
}

const SearchResultCard: React.FC<{ result: any, onSelect: () => void }> = ({ result, onSelect }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6 transform hover:shadow-2xl hover:scale-105 transition-all duration-300">
        <div className="font-bold text-gray-700 text-lg">{result.company}</div>
        <div className="flex items-center space-x-4">
            <div className="text-center">
                <p className="font-bold text-xl text-gray-800">{result.departureTime}</p>
                <p className="text-sm text-gray-500">Kigali</p>
            </div>
            <div className="text-center text-gray-400">
                <p className="text-xs">{result.duration}</p>
                <div className="w-20 h-0.5 bg-gray-300"></div>
                <p className="text-xs">Direct</p>
            </div>
            <div className="text-center">
                <p className="font-bold text-xl text-gray-800">{result.arrivalTime}</p>
                <p className="text-sm text-gray-500">Rubavu</p>
            </div>
        </div>
        <div className="text-center">
            <p className="text-2xl font-bold text-green-600">${result.price.toFixed(2)}</p>
            <p className="text-xs text-gray-500">{result.availableSeats} seats available</p>
        </div>
        <button onClick={onSelect} className="w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0033A0] font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-md">
            Select Seats <ArrowRightIcon className="w-5 h-5 ml-2" />
        </button>
    </div>
);


const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ onTripSelect }) => {
  return (
    <div className="bg-gray-100/50 min-h-full py-12">
      <div className="container mx-auto px-6">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Search Results</h1>
            <p className="text-gray-600">Kigali to Rubavu - October 28, 2024</p>
        </div>
        <div className="space-y-6">
            {searchResults.map(result => (
                <SearchResultCard key={result.id} result={result} onSelect={() => onTripSelect(result)} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
