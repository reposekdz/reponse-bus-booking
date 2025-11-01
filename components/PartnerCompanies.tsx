import React from 'react';
import { BusIcon } from './icons';

const partners = ['ONATRACOM', 'STELLART', 'RITCO', 'VOLCANO', 'HORIZON', 'SELECT', 'TRINITY', 'INTERNATIONAL'];

const PartnerCompanies: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Our Trusted Partner Companies</h2>
           <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            We collaborate with Rwanda's leading bus operators to guarantee a safe and comfortable trip.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {partners.map(partner => (
            <div key={partner} title={partner} className="group flex justify-center items-center p-4 bg-white rounded-lg shadow-md border-2 border-transparent hover:border-blue-400 hover:shadow-xl transition-all duration-300">
               <BusIcon className="h-12 w-12 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerCompanies;