import React, { useState, useMemo } from 'react';
import { SeatIcon } from './components/icons';

// --- Sub-components defined within the same file for simplicity ---

type SeatStatus = 'available' | 'occupied' | 'selected';

interface SeatProps {
  status: SeatStatus;
  seatNumber: string;
  onClick: () => void;
}

const Seat: React.FC<SeatProps> = ({ status, seatNumber, onClick }) => {
  const baseClasses = "w-12 h-12 flex items-center justify-center rounded-md border-2 transition-all duration-200 cursor-pointer";
  
  const statusClasses = {
    available: "bg-green-100 border-green-300 text-green-800 hover:bg-green-200 hover:border-green-400",
    occupied: "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed",
    selected: "bg-yellow-400 border-yellow-600 text-white font-bold transform scale-110",
  };

  return (
    <button onClick={onClick} disabled={status === 'occupied'} className={`${baseClasses} ${statusClasses[status]}`}>
        <SeatIcon className="w-6 h-6" />
        <span className="absolute text-xs font-semibold">{seatNumber}</span>
    </button>
  );
};

const BusLayout: React.FC<{ seats: any[], selectedSeats: string[], onSeatSelect: (seatId: string) => void }> = ({ seats, selectedSeats, onSeatSelect }) => (
    <div className="bg-gray-100 p-4 rounded-lg border-4 border-gray-200">
        <div className="grid grid-cols-5 gap-2">
            {seats.map(seat => {
                let status: SeatStatus = seat.isOccupied ? 'occupied' : 'available';
                if (selectedSeats.includes(seat.id)) {
                    status = 'selected';
                }
                
                if (seat.isAisle) {
                    return <div key={seat.id} className="col-span-1"></div>;
                }

                return (
                    <div key={seat.id} className="col-span-1 flex items-center justify-center">
                        <Seat status={status} seatNumber={seat.id} onClick={() => onSeatSelect(seat.id)} />
                    </div>
                );
            })}
        </div>
    </div>
);


// --- Main Page Component ---

interface SeatSelectionPageProps {
  tripData: any;
  onConfirm: (selection: { tripData: any; selectedSeats: string[]; totalPrice: number }) => void;
}

const generateSeats = () => {
    const rows = 10;
    const seats = [];
    const letters = ['A', 'B', 'C', 'D'];
    for (let i = 1; i <= rows; i++) {
        for (let j = 0; j < 5; j++) {
            if (j === 2) {
                seats.push({ id: `aisle-${i}`, isAisle: true });
            } else {
                const letterIndex = j < 2 ? j : j - 1;
                seats.push({
                    id: `${letters[letterIndex]}${i}`,
                    isOccupied: Math.random() > 0.7, // 30% chance of being occupied
                    isAisle: false,
                });
            }
        }
    }
    return seats;
};


const SeatSelectionPage: React.FC<SeatSelectionPageProps> = ({ tripData, onConfirm }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const seats = useMemo(() => generateSeats(), []);

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
      ? prev.filter(s => s !== seatId) 
      : [...prev, seatId]
    );
  };

  const totalPrice = selectedSeats.length * tripData.price;

  return (
    <div className="bg-white min-h-full py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Select Your Seats</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BusLayout seats={seats} selectedSeats={selectedSeats} onSeatSelect={handleSeatSelect} />
            <div className="flex items-center justify-center space-x-6 mt-6">
                <div className="flex items-center space-x-2"><div className="w-4 h-4 rounded bg-green-100 border border-green-300"></div><span className="text-sm">Available</span></div>
                <div className="flex items-center space-x-2"><div className="w-4 h-4 rounded bg-yellow-400 border border-yellow-600"></div><span className="text-sm">Selected</span></div>
                <div className="flex items-center space-x-2"><div className="w-4 h-4 rounded bg-gray-200 border border-gray-300"></div><span className="text-sm">Occupied</span></div>
            </div>
          </div>
          <div className="lg:col-span-1">
             <div className="bg-gray-50 rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold border-b pb-4 mb-4">Booking Summary</h2>
                <div className="space-y-2 mb-4">
                    <p><strong>Route:</strong> Kigali to Rubavu</p>
                    <p><strong>Company:</strong> {tripData.company}</p>
                    <p><strong>Date:</strong> October 28, 2024</p>
                </div>
                <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">Selected Seats ({selectedSeats.length})</h3>
                    <div className="h-20 overflow-y-auto mb-4 text-sm space-x-2">
                        {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'No seats selected'}
                    </div>
                    <div className="flex justify-between items-center text-2xl font-bold">
                        <span>Total:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                </div>
                <button 
                  onClick={() => onConfirm({ tripData, selectedSeats, totalPrice })}
                  disabled={selectedSeats.length === 0}
                  className="mt-6 w-full flex items-center justify-center p-4 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0033A0] font-bold text-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                  Confirm Booking
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionPage;
