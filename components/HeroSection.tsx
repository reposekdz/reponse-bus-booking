import React from 'react';
import SearchForm from './SearchForm';
import PartnerLogos from './PartnerLogos';

interface HeroSectionProps {
  onSearch: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  return (
    <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <img
        src="https://picsum.photos/id/1015/1920/1080"
        alt="Rwandan landscape with tea plantations"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className="bg-black/20 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SearchForm onSearch={onSearch} />
            </div>
            <PartnerLogos />
          </div>
        </div>
         <p className="mt-6 text-lg md:text-xl font-light tracking-wide text-shadow">
          Your seamless journey begins here.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
