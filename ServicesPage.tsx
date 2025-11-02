import React, { useState, FormEvent } from 'react';
import { Page } from './App';
import { BusIcon, BriefcaseIcon, MapIcon, TruckIcon, ArchiveBoxIcon, ShieldCheckIcon, CreditCardIcon, CheckCircleIcon, ArrowRightIcon } from './components/icons';
import PackageTrackingModal from './PackageTrackingModal';

interface ServicesPageProps {
    onNavigate: (page: Page, data?: any) => void;
    onToggleServicesAside: () => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onToggleServicesAside }) => {
    const [trackingId, setTrackingId] = useState('');
    const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);

    const handleTrackPackage = (e: FormEvent) => {
        e.preventDefault();
        if (trackingId) {
            setIsTrackingModalOpen(true);
        }
    }

    return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <header className="bg-white dark:bg-gray-800/50 shadow-sm pt-12 pb-8">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Serivisi zacu zidasanzwe</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                    Byinshi birenze amatike. Turi hano kugira ngo urugendo rwawe rwose rube intangarugero.
                </p>
            </div>
        </header>
        <main className="container mx-auto px-6 py-12">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Featured Service: Package Delivery */}
                    <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0">
                             <ArchiveBoxIcon className="w-24 h-24 text-white/50" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">Ohereza Ipaki mu Bwihuse</h2>
                            <p className="mt-2 mb-4 text-blue-100">Serivisi yacu yo gutwara imizigo irizewe, itekanye, kandi yihuta. Ohereza ibintu byawe mu Rwanda hose nta mpungenge.</p>
                            <button onClick={() => onNavigate('packageDelivery')} className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition shadow-md">
                                Kohereza Ipaki Nonaha
                            </button>
                        </div>
                    </div>

                    {/* Track Package */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-bold dark:text-white mb-2 flex items-center"><TruckIcon className="w-6 h-6 mr-3 text-blue-500" /> Kurikirana Ipaki Yawe</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Shyiramo nomero yo gukurikirana ipaki yawe kugirango umenye aho igeze.</p>
                        <form onSubmit={handleTrackPackage} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <input 
                                type="text" 
                                value={trackingId}
                                onChange={e => setTrackingId(e.target.value.toUpperCase())}
                                placeholder="e.g., PKG-XYZ123" 
                                className="flex-grow p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">Kurikirana</button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg h-full flex flex-col">
                        <h2 className="text-xl font-bold dark:text-white mb-4">Serivisi Zose</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-grow">Sura urutonde rwacu rwuzuye rwa serivisi zagenewe guhindura urugendo rwawe rwiza kurushaho.</p>
                        <button onClick={onToggleServicesAside} className="w-full flex items-center justify-center py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                            Reba Serivisi Zose
                            <ArrowRightIcon className="w-4 h-4 ml-2"/>
                        </button>
                    </div>
                </div>
            </div>
        </main>
        {isTrackingModalOpen && <PackageTrackingModal trackingId={trackingId} onClose={() => setIsTrackingModalOpen(false)} />}
    </div>
  );
};

export default ServicesPage;