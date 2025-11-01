import React from 'react';
import { ArrowRightIcon } from './icons';

interface RouteCardProps {
  from: string;
  to: string;
  price: string;
  imageUrl: string;
}

const RouteCard: React.FC<RouteCardProps> = ({ from, to, price, imageUrl }) => (
  <div className="flex-shrink-0 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
    <div className="relative h-52">
        <img src={imageUrl} alt={`Bus for route ${from} to ${to}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 w-full">
           <div className="flex justify-between items-end">
                <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">{from}</h3>
                    <ArrowRightIcon className="w-5 h-5 text-yellow-300 my-1" />
                    <h3 className="text-xl font-bold text-white tracking-wide">{to}</h3>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-200">Guhera ku</p>
                    <p className="text-2xl font-bold text-yellow-300">{price}</p>
                </div>
           </div>
        </div>
    </div>
  </div>
);


const FeaturedRoutes: React.FC = () => {
  const routes: RouteCardProps[] = [
    { from: 'Kigali', to: 'Rubavu', price: '4,500 FRW', imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c186922?q=80&w=2070&auto=format&fit=crop' },
    { from: 'Huye', to: 'Musanze', price: '5,000 FRW', imageUrl: 'https://images.pexels.com/photos/385997/pexels-photo-385997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { from: 'Kigali', to: 'Nyungwe', price: '7,000 FRW', imageUrl: 'https://images.pexels.com/photos/18413861/pexels-photo-18413861/free-photo-of-a-bus-is-driving-down-a-road-in-the-mountains.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { from: 'Musanze', to: 'Gisenyi', price: '3,000 FRW', imageUrl: 'https://images.pexels.com/photos/2174975/pexels-photo-2174975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { from: 'Kigali', to: 'Akagera', price: '8,000 FRW', imageUrl: 'https://images.pexels.com/photos/2418491/pexels-photo-2418491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">Ingendo Zikunzwe</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">Menya ahantu heza nyaburanga mu gihugu cy'imisozi igihumbi.</p>
        </div>
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