import React from 'react';
import { SearchIcon, CheckCircleIcon, TicketIcon, CreditCardIcon } from './icons';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center max-w-xs">
    <div className="mb-4 p-5 rounded-full bg-gradient-to-br from-blue-400 to-green-400 text-white shadow-lg">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-yellow-50/30 to-white dark:from-gray-800/30 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">Gukata itike mu ntambwe 4 zoroshye</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">Urugendo rwawe rutaha ruri hafi yawe.</p>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-start gap-y-12 md:gap-x-8 lg:gap-x-16">
          <Step
            icon={<SearchIcon className="w-10 h-10" />}
            title="Shakisha & Gereranya"
            description="Bona mu buryo bworoshye bisi nziza ijyanye n'igihe cyawe n'ubushobozi bwawe."
          />
          <Step
            icon={<CheckCircleIcon className="w-10 h-10" />}
            title="Hitamo Umwanya"
            description="Hitamo umwanya wawe mu modoka, hanyuma ukomeze kwishyura."
          />
           <Step
            icon={<CreditCardIcon className="w-10 h-10" />}
            title="Ishyura mu Bwizere"
            description="Koresha MoMo, Ikarita, cyangwa Ikofi yawe ngo wishyure mu buryo butekanye."
          />
          <Step
            icon={<TicketIcon className="w-10 h-10" />}
            title="Bona Itike & Genda"
            description="Emeza itike yawe ya elegitoronike ako kanya hanyuma witegure urugendo."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
