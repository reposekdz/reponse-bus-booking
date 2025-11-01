import React, { useState } from 'react';
import { XIcon, PaperAirplaneIcon } from './icons';

// Define the shape of a service for type safety
interface Service {
  title: string;
  icon: React.ElementType;
}

interface ServiceRequestModalProps {
  service: Service | null;
  onClose: () => void;
}

const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({ service, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const renderForm = () => {
    switch (service.title) {
        case 'Kodesha Imodoka':
            return (
                <>
                    <h3 className="text-2xl font-bold mb-4 dark:text-white">{service.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm dark:text-gray-300">Uva</label>
                            <input type="text" className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" placeholder="e.g., Kigali" />
                        </div>
                        <div>
                            <label className="text-sm dark:text-gray-300">Ujya</label>
                            <input type="text" className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" placeholder="e.g., Rubavu" />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm dark:text-gray-300">Itariki</label>
                        <input type="date" className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                     <div>
                        <label className="text-sm dark:text-gray-300">Umubare w'abantu</label>
                        <input type="number" min="10" className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" placeholder="e.g., 25" />
                    </div>
                </>
            );
        case 'Gutwara Ibintu':
            return (
                 <>
                    <h3 className="text-2xl font-bold mb-4 dark:text-white">{service.title}</h3>
                    <div>
                        <label className="text-sm dark:text-gray-300">Icyo aribyo</label>
                        <input type="text" className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" placeholder="e.g., Ikarito, Ibikoresho" />
                    </div>
                    <div>
                        <label className="text-sm dark:text-gray-300">Ibiro (kg)</label>
                        <input type="number" min="1" className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" placeholder="e.g., 5" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label className="text-sm dark:text-gray-300">Aho biva</label>
                            <input type="text" className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" placeholder="e.g., Huye"/>
                        </div>
                         <div>
                            <label className="text-sm dark:text-gray-300">Aho bijya</label>
                            <input type="text" className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" placeholder="e.g., Musanze"/>
                        </div>
                    </div>
                </>
            );
        case 'Ibicuba by\'Agaciro':
             return (
                <>
                    <h3 className="text-2xl font-bold mb-4 dark:text-white">{service.title}</h3>
                    <div>
                        <label className="text-sm dark:text-gray-300">Hitamo Gare</label>
                        <select className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                            <option>Gare ya Nyabugogo</option>
                            <option>Gare ya Huye</option>
                            <option>Gare ya Rubavu</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm dark:text-gray-300">Umubare w'abantu</label>
                        <input type="number" min="1" max="10" className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" placeholder="1" />
                    </div>
                    <div>
                        <label className="text-sm dark:text-gray-300">Itariki</label>
                        <input type="date" className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                </>
            );
         case 'Serivisi yo Gutwara Abantu':
             return (
                 <>
                    <h3 className="text-2xl font-bold mb-4 dark:text-white">{service.title}</h3>
                     <div>
                        <label className="text-sm dark:text-gray-300">Aderesi yo kugushyira</label>
                        <input type="text" className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" placeholder="e.g., Kigali Convention Centre"/>
                    </div>
                     <div>
                        <label className="text-sm dark:text-gray-300">Isaha bisi igereyeho</label>
                        <input type="time" className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                    <div>
                        <label className="text-sm dark:text-gray-300">Umubare w'abagenzi</label>
                        <input type="number" min="1" max="8" className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" placeholder="1"/>
                    </div>
                </>
            );
        default:
            return (
                 <>
                    <h3 className="text-2xl font-bold mb-4 dark:text-white">{service.title}</h3>
                    <div>
                        <label className="text-sm dark:text-gray-300">Amazina yawe</label>
                        <input type="text" className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                     <div>
                        <label className="text-sm dark:text-gray-300">Imeri</label>
                        <input type="email" className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <div>
                        <label className="text-sm dark:text-gray-300">Ubutumwa</label>
                        <textarea rows={4} className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" placeholder="Tuvugishe birambuye..."></textarea>
                    </div>
                 </>
            );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-lg w-full relative">
            <button onClick={onClose} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-700 dark:hover:text-white"><XIcon className="w-6 h-6"/></button>
            <div className="p-8">
                {isSubmitted ? (
                    <div className="text-center py-8">
                        <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">Twakiriye ubusabe bwawe!</h3>
                        <p className="text-gray-600 dark:text-gray-300">Itsinda ryacu rigiye kubisuzuma, turagusubiza vuba.</p>
                        <button onClick={onClose} className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">Funga</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {renderForm()}
                        <div className="pt-4 border-t dark:border-gray-700">
                             <button type="submit" className="w-full flex items-center justify-center p-3 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0033A0] font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-md">
                                Ohereza Ubusabe <PaperAirplaneIcon className="w-5 h-5 ml-2" />
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    </div>
  );
};

export default ServiceRequestModal;