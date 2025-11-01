import React from 'react';
import SearchForm from './SearchForm';

interface HeroSectionProps {
  onSearch: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-green-900/30 z-10"></div>
      <video
        src="https://videos.pexels.com/video-files/3222426/3222426-hd_1920_1080_25fps.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className="bg-gradient-to-br from-white/20 to-white/0 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 max-w-4xl mx-auto border border-white/20">
           <SearchForm onSearch={onSearch} />
        </div>
         <p className="mt-8 text-lg md:text-xl font-light tracking-wide text-shadow-md">
          Urugendo rwawe ruhebuje rutangirira hano.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;