
import React from 'react';

interface RouteCardProps {
  from: string;
  to: string;
  price: number;
  imageUrl: string;
}

const RouteCard: React.FC<RouteCardProps> = ({ from, to, price, imageUrl }) => (
  <div className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group">
    <img src={imageUrl} alt={`View of ${to}`} className="w-full h-40 object-cover" />
    <div className="p-5 bg-gradient-to-t from-lime-50 to-white border-t-4 border-lime-300">
      <h3 className="text-lg font-bold text-gray-800">{from} to {to}</h3>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">Starting From</p>
        <p className="text-xl font-bold text-green-700">${price.toFixed(2)}</p>
      </div>
    </div>
  </div>
);

const FeaturedRoutes: React.FC = () => {
  const routes: RouteCardProps[] = [
    { from: 'Kigali', to: 'Rubavu', price: 14.00, imageUrl: 'https://picsum.photos/id/10/400/300' },
    { from: 'Vigali', to: 'Rubavu', price: 76.00, imageUrl: 'https://picsum.photos/id/22/400/300' },
    { from: 'Kigali', to: 'Rubavu', price: 52.00, imageUrl: 'https://picsum.photos/id/35/400/300' },
    { from: 'Huye', to: 'Musanze', price: 25.00, imageUrl: 'https://picsum.photos/id/48/400/300' },
    { from: 'Kigali', to: 'Nyungwe', price: 35.00, imageUrl: 'https://picsum.photos/id/54/400/300' },
  ];

  return (
    <section className="py-16 bg-white sm:py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Featured Routes</h2>
        <div className="flex space-x-8 pb-4 -mx-6 px-6 overflow-x-auto custom-scrollbar">
          {routes.map((route, index) => (
            <RouteCard key={index} {...route} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRoutes;
