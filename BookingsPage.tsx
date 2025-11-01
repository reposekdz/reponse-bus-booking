import React, { useState } from 'react';
import { TicketIcon } from './components/icons';
import StarRating from './components/StarRating';

const ReviewModal: React.FC<{ trip: any; onClose: () => void }> = ({ trip, onClose }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ rating, review });
    onClose();
    alert('Thank you for your review!');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h3 className="text-xl font-bold mb-2">Review your trip</h3>
        <p className="text-gray-600 mb-4">{trip.route}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
            <StarRating rating={rating} onRatingChange={setRating} isInteractive={true} size="large" />
          </div>
          <div className="mb-6">
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
            <textarea
              id="review"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Tell us about your experience..."
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0033A0] font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const BookingCard: React.FC<{ trip: any; isPast?: boolean; onReview: (trip: any) => void }> = ({ trip, isPast, onReview }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row">
    <div className="p-5 flex-grow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{trip.date}</p>
          <h4 className="text-lg font-bold text-gray-800">{trip.route}</h4>
          <p className="text-sm text-gray-600">Operated by {trip.company}</p>
        </div>
        <div className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${isPast ? 'bg-gray-200 text-gray-700' : 'bg-green-100 text-green-800'}`}>
          {isPast ? 'Completed' : 'Upcoming'}
        </div>
      </div>
      <div className="border-t my-4"></div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Seats: <span className="font-medium text-gray-800">{trip.seats}</span></p>
          <p className="text-sm text-gray-500">Total Price: <span className="font-medium text-gray-800">{trip.price}</span></p>
        </div>
        {isPast && (
          <button onClick={() => onReview(trip)} className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold hover:from-blue-600 hover:to-blue-700 transition-all">
            Rate & Review
          </button>
        )}
      </div>
    </div>
  </div>
);


const BookingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [reviewingTrip, setReviewingTrip] = useState<any | null>(null);

  const upcomingTrips = [
    { date: 'Oct 28, 2024', route: 'Kigali to Rubavu', company: 'Volcano Express', seats: 'A5, A6', price: '$28.00' },
  ];
  const pastTrips = [
    { date: 'Sep 15, 2024', route: 'Huye to Musanze', company: 'Horizon Express', seats: 'C2', price: '$25.00' },
    { date: 'Aug 02, 2024', route: 'Kigali to Nyungwe', company: 'RITCO', seats: 'B1, B2', price: '$70.00' },
  ];

  return (
    <div className="bg-gray-100/50 min-h-full py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Bookings</h1>

        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button onClick={() => setActiveTab('upcoming')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'upcoming' ? 'border-yellow-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Upcoming
            </button>
            <button onClick={() => setActiveTab('past')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'past' ? 'border-yellow-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Past
            </button>
          </nav>
        </div>

        <div className="space-y-6">
          {activeTab === 'upcoming' && (upcomingTrips.length > 0 ? upcomingTrips.map((trip, i) => <BookingCard key={i} trip={trip} onReview={setReviewingTrip} />) : <p>No upcoming trips.</p>)}
          {activeTab === 'past' && (pastTrips.length > 0 ? pastTrips.map((trip, i) => <BookingCard key={i} trip={trip} isPast onReview={setReviewingTrip} />) : <p>No past trips.</p>)}
        </div>
      </div>
      {reviewingTrip && <ReviewModal trip={reviewingTrip} onClose={() => setReviewingTrip(null)} />}
    </div>
  );
};

export default BookingsPage;
