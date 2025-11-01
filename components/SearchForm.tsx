import React, { useState } from 'react';
import { CalendarIcon, ArrowRightIcon } from './icons';

type TripType = 'one-way' | 'round-trip';

interface SearchFormProps {
  onSearch: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [tripType, setTripType] = useState<TripType>('one-way');

  return (
    <div className="text-left">
      <div className="mb-4 flex items-center bg-black/20 rounded-full p-1 max-w-xs">
        <button
          onClick={() => setTripType('one-way')}
          className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
            tripType === 'one-way' ? 'bg-white/90 text-[#0033A0]' : 'text-white hover:bg-white/10'
          }`}
        >
          One Way
        </button>
        <button
          onClick={() => setTripType('round-trip')}
          className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
            tripType === 'round-trip' ? 'bg-white/90 text-[#0033A0]' : 'text-white hover:bg-white/10'
          }`}
        >
          Round Trip
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="from" className="block text-sm font-medium mb-1 text-gray-200">From</label>
          <select id="from" className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all">
            <option>From Nyamata to Rubavu</option>
            <option>Kigali</option>
            <option>Huye</option>
            <option>Musanze</option>
          </select>
        </div>
        <div>
          <label htmlFor="to" className="block text-sm font-medium mb-1 text-gray-200">To</label>
           <input type="text" id="to" placeholder="Gisenyi to Tibati" className="w-full bg-white/90 text-gray-800 border border-transparent rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="relative">
          <label htmlFor="departure" className="block text-sm font-medium mb-1 text-gray-200">Departure Date</label>
          <input type="date" id="departure" className="w-full bg-white/10 border border-white/20 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all" />
          <CalendarIcon className="absolute right-3 top-10 h-5 w-5 text-gray-300" />
        </div>
        <div className="relative">
          <label htmlFor="return" className="block text-sm font-medium mb-1 text-gray-200">Return Date</label>
          <input
            type="date"
            id="return"
            disabled={tripType === 'one-way'}
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          />
          <CalendarIcon className="absolute right-3 top-10 h-5 w-5 text-gray-300" />
        </div>
      </div>
      <button 
        onClick={onSearch}
        className="w-full flex items-center justify-center p-4 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0033A0] font-bold text-lg hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
      >
        Search Buses
        <ArrowRightIcon className="w-6 h-6 ml-3" />
      </button>
    </div>
  );
};

export default SearchForm;
