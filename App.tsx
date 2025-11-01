import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturedRoutes from './components/FeaturedRoutes';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import BookingsPage from './BookingsPage';
import CompaniesPage from './CompaniesPage';
import HelpPage from './HelpPage';
import ContactPage from './ContactPage';
import SearchResultsPage from './SearchResultsPage';
import SeatSelectionPage from './SeatSelectionPage';
import PartnerCompanies from './components/PartnerCompanies';

export type Page = 'home' | 'login' | 'register' | 'bookings' | 'companies' | 'help' | 'contact' | 'searchResults' | 'seatSelection';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);

  const navigate = (targetPage: Page) => {
    // Prevent access to certain pages if not logged in
    if ((targetPage === 'bookings') && !isLoggedIn) {
      setPage('login');
      return;
    }
    setPage(targetPage);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setPage('home');
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setPage('home');
  };

  const handleSearch = () => {
    navigate('searchResults');
  };
  
  const handleTripSelect = (trip: any) => {
    setBookingData({ trip });
    navigate('seatSelection');
  };
  
  const handleBookingConfirm = (selection: any) => {
    // In a real app, this would submit the booking
    console.log('Booking confirmed:', selection);
    alert('Booking successful! View details in "My Bookings".');
    navigate('bookings');
  }

  const renderContent = () => {
    switch (page) {
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={navigate} />;
      case 'register':
        return <RegisterPage onNavigate={navigate} />;
      case 'bookings':
        return <BookingsPage />;
      case 'companies':
        return <CompaniesPage />;
      case 'help':
        return <HelpPage />;
      case 'contact':
        return <ContactPage />;
      case 'searchResults':
        return <SearchResultsPage onTripSelect={handleTripSelect} />;
      case 'seatSelection':
        return <SeatSelectionPage tripData={bookingData.trip} onConfirm={handleBookingConfirm} />;
      case 'home':
      default:
        return (
          <>
            <HeroSection onSearch={handleSearch} />
            <PartnerCompanies />
            <FeaturedRoutes />
            <HowItWorks />
          </>
        );
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      <Header navigate={navigate} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main className="flex-grow pt-16">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;