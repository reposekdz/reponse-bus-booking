import React from 'react';
import SearchForm from './SearchForm';

interface HeroSectionProps {
  onSearch: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  return (
    <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-green-900/20 z-10"></div>
      <img
        src="https://images.unsplash.com/photo-1593256398246-8853b3815c32?q=80&w=2070&auto=format&fit=crop"
        alt="Rwandan landscape with rolling hills at sunrise"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className="bg-black/30 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 max-w-3xl mx-auto">
           <SearchForm onSearch={onSearch} />
        </div>
         <p className="mt-8 text-lg md:text-xl font-light tracking-wide text-shadow-md">
          Your seamless journey begins here.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;