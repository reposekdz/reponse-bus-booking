import React, { useState } from 'react';
import { LocationMarkerIcon, CalendarIcon, UserCircleIcon, ArrowRightIcon, PlusIcon, TagIcon, ArrowsUpDownIcon } from './icons';

interface BookingFormProps {
  onSearch: (from: string, to: string) => void;
}

const locations = ['Kigali', 'Rubavu', 'Musanze', 'Huye', 'Rusizi', 'Nyagatare', 'Muhanga'];

const BookingForm: React.FC<BookingFormProps> = ({ onSearch }) => {
  const [fromLocation, setFromLocation] = useState('Kigali');
  const [toLocation, setToLocation] = useState('Rubavu');
  const [journeyDate, setJourneyDate] = useState(new Date().toISOString().split('T')[0]);
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState({ adults: 1, children: 0 });
  const [isPassengerDropdownOpen, setIsPassengerDropdownOpen] = useState(false);
  const [tripType, setTripType] = useState('one-way');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(fromLocation, toLocation);
  };

  const swapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };
  
  const handlePassengerChange = (type: 'adults' | 'children', operation: 'inc' | 'dec') => {
      setPassengers(prev => ({
          ...prev,
          [type]: operation === 'inc' ? prev[type] + 1 : Math.max(type === 'adults' ? 1 : 0, prev[type] - 1)
      }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-gray-800 dark:text-white">
      <div className="flex items-center space-x-4 mb-4">
        <button type="button" onClick={() => setTripType('one-way')} className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${tripType === 'one-way' ? 'bg-yellow-300 text-blue-900' : 'bg-white/20 text-white'}`}>Urugendo Rumwe</button>
        <button type="button" onClick={() => setTripType('round-trip')} className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${tripType === 'round-trip' ? 'bg-yellow-300 text-blue-900' : 'bg-white/20 text-white'}`}>Kugenda no Kugaruka</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
          <div className="relative">
            <label htmlFor="from" className="absolute -top-2 left-3 text-xs bg-transparent px-1 text-white z-10">Aho uherereye</label>
            <LocationMarkerIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
            <select
              id="from"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-yellow-300 focus:ring-0 bg-white/80 dark:bg-gray-900/80 transition appearance-none"
            >
              {locations.map(loc => <option key={`from-${loc}`} value={loc}>{loc}</option>)}
            </select>
          </div>

          <div className="relative mt-4">
             <button type="button" onClick={swapLocations} className="w-10 h-10 rounded-full bg-white/30 text-white flex items-center justify-center hover:bg-white/50 transition-colors transform hover:rotate-180 duration-300">
                <ArrowsUpDownIcon className="w-5 h-5"/>
             </button>
          </div>

           <div className="relative">
            <label htmlFor="to" className="absolute -top-2 left-3 text-xs bg-transparent px-1 text-white z-10">Aho werekeje</label>
            <LocationMarkerIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
            <select
              id="to"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-yellow-300 focus:ring-0 bg-white/80 dark:bg-gray-900/80 transition appearance-none"
            >
              {locations.map(loc => <option key={`to-${loc}`} value={loc}>{loc}</option>)}
            </select>
          </div>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="date" className="absolute -top-2 left-3 text-xs bg-transparent px-1 text-white z-10">Itariki</label>
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
            <input type="date" id="date" value={journeyDate} onChange={(e) => setJourneyDate(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-yellow-300 focus:ring-0 bg-white/80 dark:bg-gray-900/80 transition"/>
          </div>
          <div className={`relative transition-opacity ${tripType === 'one-way' ? 'opacity-50' : 'opacity-100'}`}>
            <label htmlFor="return-date" className="absolute -top-2 left-3 text-xs bg-transparent px-1 text-white z-10">Itariki yo kugaruka</label>
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
            <input type="date" id="return-date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} disabled={tripType === 'one-way'} className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-yellow-300 focus:ring-0 bg-white/80 dark:bg-gray-900/80 transition"/>
          </div>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="absolute -top-2 left-3 text-xs bg-transparent px-1 text-white z-10">Abagenzi</label>
            <button type="button" onClick={() => setIsPassengerDropdownOpen(!isPassengerDropdownOpen)} className="w-full flex items-center text-left pl-10 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-yellow-300 focus:ring-0 bg-white/80 dark:bg-gray-900/80 transition">
                 <UserCircleIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                 {passengers.adults} Adult(s), {passengers.children} Child(ren)
            </button>
             {isPassengerDropdownOpen && (
                <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 z-20">
                    <div className="flex justify-between items-center">
                        <p>Abakuru</p>
                        <div className="flex items-center space-x-2">
                            <button type="button" onClick={() => handlePassengerChange('adults', 'dec')} className="p-1 rounded-full bg-gray-200 dark:bg-gray-700">-</button>
                            <span>{passengers.adults}</span>
                            <button type="button" onClick={() => handlePassengerChange('adults', 'inc')} className="p-1 rounded-full bg-gray-200 dark:bg-gray-700">+</button>
                        </div>
                    </div>
                     <div className="flex justify-between items-center mt-2">
                        <p>Abana</p>
                        <div className="flex items-center space-x-2">
                            <button type="button" onClick={() => handlePassengerChange('children', 'dec')} className="p-1 rounded-full bg-gray-200 dark:bg-gray-700">-</button>
                            <span>{passengers.children}</span>
                            <button type="button" onClick={() => handlePassengerChange('children', 'inc')} className="p-1 rounded-full bg-gray-200 dark:bg-gray-700">+</button>
                        </div>
                    </div>
                </div>
            )}
          </div>
            <div className="relative">
                <label className="absolute -top-2 left-3 text-xs bg-transparent px-1 text-white z-10">Kode</label>
                <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
                <input type="text" placeholder="Shyiramo kode" className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-yellow-300 focus:ring-0 bg-white/80 dark:bg-gray-900/80 transition"/>
            </div>
       </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0033A0] font-bold hover:saturate-150 transition-all duration-300 shadow-lg text-lg transform hover:-translate-y-0.5"
      >
        Shakisha Ingendo <ArrowRightIcon className="w-5 h-5 ml-2" />
      </button>
    </form>
  );
};

export default BookingForm;