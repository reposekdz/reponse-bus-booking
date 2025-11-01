
import React from 'react';

const PartnerLogo: React.FC<{ name: string }> = ({ name }) => (
  <div className="h-20 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center p-4 transition-all duration-300 hover:bg-white/20 hover:border-white/40">
    <p className="font-bold text-sm tracking-widest">{name}</p>
  </div>
);

const PartnerLogos: React.FC = () => {
  const partners = ['ONATRACOM', 'STELLART', 'RITCO', 'VOLCANO', 'HORIZON', 'SELECT'];

  return (
    <div className="flex flex-col justify-center h-full">
      <div className="grid grid-cols-2 gap-4">
        {partners.map(partner => <PartnerLogo key={partner} name={partner} />)}
      </div>
    </div>
  );
};

export default PartnerLogos;
