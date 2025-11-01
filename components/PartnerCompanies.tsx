import React from 'react';

const partners = [
  { name: 'RITCO', route: 'Kigali - Huye' },
  { name: 'VOLCANO', route: 'Kigali - Rubavu' },
  { name: 'HORIZON', route: 'Huye - Musanze' },
  { name: 'TRINITY', route: 'Kigali - Nyagatare' },
  { name: 'INTERNATIONAL', route: 'Kigali - Gisenyi' },
  { name: 'STELLART', route: 'Kigali - Rusizi' },
  { name: 'SELECT', route: 'Muhanga - Karongi' },
  { name: 'ONATRACOM', route: 'Ngoma - Kirehe' }
];

const PartnerCard: React.FC<{ partner: typeof partners[0] }> = ({ partner }) => (
  <div className="perspective group">
    <div className="relative preserve-3d group-hover:rotate-y-10 transition-transform duration-500 ease-in-out w-full h-40">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-lg flex flex-col items-center justify-center p-4 border dark:border-gray-700">
        <h3 className="text-xl font-extrabold tracking-widest text-gray-800 dark:text-white uppercase">{partner.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Ikunzwe: {partner.route}</p>
      </div>
       <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-green-400 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-4 translate-y-4 -rotate-3 -z-10"></div>
    </div>
  </div>
);

const PartnerCompanies: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">Ibigo by'Ingendo Dukorana</h2>
           <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Dukorana n'ibigo by'ingendo by'imena mu Rwanda kugira ngo tukwizere urugendo rwiza kandi rutekanye.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {partners.map(partner => (
            <PartnerCard key={partner.name} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerCompanies;