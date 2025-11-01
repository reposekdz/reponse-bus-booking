import React from 'react';
import StarRating from './components/StarRating';

const companies = [
  { name: 'RITCO', rating: 4.5, reviews: 120 },
  { name: 'Volcano Express', rating: 4.8, reviews: 250 },
  { name: 'Horizon Express', rating: 4.2, reviews: 98 },
  { name: 'ONATRACOM', rating: 3.9, reviews: 75 },
  { name: 'STELLART', rating: 4.6, reviews: 150 },
  { name: 'SELECT', rating: 4.1, reviews: 60 },
];

const CompanyCard: React.FC<{ company: typeof companies[0] }> = ({ company }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300">
        <div className="h-24 w-24 bg-gray-100 border-4 border-white -mt-16 mb-4 rounded-full flex items-center justify-center shadow-lg">
            <p className="font-bold text-gray-700 tracking-widest text-sm">{company.name}</p>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{company.name}</h3>
        <div className="flex items-center space-x-2">
            <StarRating rating={company.rating} />
            <span className="text-sm text-gray-500">({company.reviews} reviews)</span>
        </div>
    </div>
);

const CompaniesPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Our Trusted Partners</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            We partner with the best bus companies in Rwanda to ensure you have a safe and comfortable journey.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {companies.map(company => <CompanyCard key={company.name} company={company} />)}
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;
