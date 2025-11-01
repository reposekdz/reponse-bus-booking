import React from 'react';

interface RouteCardProps {
  from: string;
  to: string;
  price: number;
  imageUrl: string;
}

const RouteCard: React.FC<RouteCardProps> = ({ from, to, price, imageUrl }) => (
  <div className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group">
    <div className="relative">
        <img src={imageUrl} alt={`View of ${to}`} className="w-full h-40 object-cover" />
        <div className="absolute inset-0 bg-black/20"></div>
    </div>
    <div className="p-5 bg-gradient-to-br from-green-50 to-teal-50">
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
    { from: 'Kigali', to: 'Rubavu', price: 14.00, imageUrl: 'https://images.unsplash.com/photo-1605641793224-6512a8d8363b?q=80&w=1974&auto=format&fit=crop' },
    { from: 'Huye', to: 'Musanze', price: 25.00, imageUrl: 'https://images.unsplash.com/photo-1593256398246-8853b3815c32?q=80&w=2070&auto=format&fit=crop' },
    { from: 'Kigali', to: 'Nyungwe', price: 35.00, imageUrl: 'https://images.unsplash.com/photo-1581739814283-565f4c8d33d3?q=80&w=2070&auto=format&fit=crop' },
    { from: 'Musanze', to: 'Gisenyi', price: 18.00, imageUrl: 'https://images.unsplash.com/photo-1618237381044-734c3826868a?q=80&w=2070&auto=format&fit=crop' },
    { from: 'Kigali', to: 'Akagera', price: 40.00, imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop' },
  ];

  return (
    <section className="py-16 bg-white sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Featured Routes</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Explore popular destinations across the Land of a Thousand Hills.</p>
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