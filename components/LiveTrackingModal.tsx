import React, { useState, useEffect } from 'react';
import { BusIcon, XIcon } from './icons';

interface LiveTrackingModalProps {
  trip: any;
  onClose: () => void;
}

const statusMessages = [
    { progress: 0, message: 'Preparing for departure...' },
    { progress: 10, message: 'On the move' },
    { progress: 25, message: 'Navigating city traffic...' },
    { progress: 50, message: 'Cruising on the highway' },
    { progress: 75, message: 'Stuck in traffic near destination' },
    { progress: 90, message: 'Approaching destination' },
    { progress: 98, message: 'Arrived!' },
];

const LiveTrackingModal: React.FC<LiveTrackingModalProps> = ({ trip, onClose }) => {
  const [progress, setProgress] = useState(5); // Start at 5%
  const [eta, setEta] = useState('3h 25m');
  const [status, setStatus] = useState('Preparing for departure...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) {
          clearInterval(interval);
          return prev;
        }
        // Simulate variable speed
        let increment = 1;
        if (prev > 20 && prev < 60) increment = Math.random() * 4 + 2; // Faster on highway
        else if (prev > 70 && prev < 85) increment = Math.random() * 0.5 + 0.2; // Slower in traffic
        else increment = Math.random() * 2 + 0.5;

        return Math.min(prev + increment, 98);
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
      const totalMinutes = 210; // 3h 30m
      const remainingMinutes = Math.floor(totalMinutes * (1 - progress / 100));
      const hours = Math.floor(remainingMinutes / 60);
      const minutes = remainingMinutes % 60;
      setEta(progress >= 98 ? 'Arrived' : `${hours}h ${minutes}m`);

      const currentStatus = statusMessages.slice().reverse().find(s => progress >= s.progress);
      if (currentStatus) {
          setStatus(currentStatus.message);
      }

  }, [progress]);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-2xl w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          <XIcon className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-bold mb-2 dark:text-white">Kurikirana Bisi</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{trip.route} - {trip.company}</p>
        
        <div className="bg-gray-100 dark:bg-gray-900/50 rounded-lg p-4 relative overflow-hidden border dark:border-gray-700">
            <div 
                className="absolute inset-0 bg-repeat opacity-10 dark:opacity-20" 
                style={{ backgroundImage: "url('https://www.toptal.com/designers/subtlepatterns/uploads/maps.png')" }}
            ></div>

            <div className="relative h-20 flex items-center">
                 <div className="w-full h-1.5 bg-gray-400/50 dark:bg-gray-500/50 rounded-full flex justify-between items-center px-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-800 shadow-md"></div>
                    <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white dark:border-gray-800 shadow-md"></div>
                 </div>
                 <div className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-linear" style={{ left: `${progress}%` }}>
                    <BusIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 transform -translate-x-1/2 -rotate-90 drop-shadow-lg" />
                 </div>
            </div>
             <div className="flex justify-between text-sm font-bold mt-2 text-gray-700 dark:text-gray-300">
                <span>Kigali</span>
                <span>Rubavu</span>
            </div>
        </div>

        <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Igihe gisigaye (giteganyijwe)</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{eta}</p>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1">{status}</p>
        </div>

      </div>
    </div>
  );
};

export default LiveTrackingModal;