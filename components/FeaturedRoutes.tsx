import React from 'react';

interface RouteCardProps {
  from: string;
  to: string;
  price: string;
  imageUrl: string;
}

const RouteCard: React.FC<RouteCardProps> = ({ from, to, price, imageUrl }) => (
  <div className="flex-shrink-0 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group">
    <div className="relative">
        <img src={imageUrl} alt={`View of ${to}`} className="w-full h-40 object-cover" />
        <div className="absolute inset-0 bg-black/20"></div>
    </div>
    <div className="p-5 bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-800">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">{from} - {to}</h3>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Guhera ku</p>
        <p className="text-xl font-bold text-green-700 dark:text-green-400">{price}</p>
      </div>
    </div>
  </div>
);

const FeaturedRoutes: React.FC = () => {
  const routes: RouteCardProps[] = [
    { from: 'Kigali', to: 'Rubavu', price: '4,500 FRW', imageUrl: 'https://images.unsplash.com/photo-1605641793224-6512a8d8363b?q=80&w=1974&auto=format&fit=crop' },
    { from: 'Huye', to: 'Musanze', price: '5,000 FRW', imageUrl: 'https://images.unsplash.com/photo-1593256398246-8853b3815c32?q=80&w=2070&auto=format&fit=crop' },
    { from: 'Kigali', to: 'Nyungwe', price: '7,000 FRW', imageUrl: 'https://images.unsplash.com/photo-1581739814283-565f4c8d33d3?q=80&w=2070&auto=format&fit=crop' },
    { from: 'Musanze', to: 'Gisenyi', price: '3,000 FRW', imageUrl: 'https://images.unsplash.com/photo-1618237381044-734c3826868a?q=80&w=2070&auto=format&fit=crop' },
    { from: 'Kigali', to: 'Akagera', price: '8,000 FRW', imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop' },
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