import React from 'react';

const HelpPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Help Center</h1>
        <div className="max-w-3xl mx-auto text-gray-700 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">How do I book a ticket?</h3>
                <p>You can book a ticket by using the search form on our homepage. Select your departure and destination points, choose a date, and click "Search Buses". You will then be guided through the selection and payment process.</p>
              </div>
              <div>
                <h3 className="font-semibold">Can I cancel my booking?</h3>
                <p>Yes, cancellation policies vary by bus operator. Please check the cancellation policy for your specific ticket in the "My Bookings" section after logging in.</p>
              </div>
               <div>
                <h3 className="font-semibold">How do I receive my e-ticket?</h3>
                <p>Your e-ticket will be sent to your registered email address immediately after a successful booking. You can also access it from the "My Bookings" section on our website.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
