
import React from 'react';
import { SearchIcon, CheckCircleIcon, TicketIcon } from './icons';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center max-w-xs">
    <div className="mb-4 p-5 rounded-full bg-gradient-to-br from-green-400 to-cyan-500 text-white shadow-lg">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-yellow-50/30 to-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-start md:space-x-12 lg:space-x-24 space-y-12 md:space-y-0">
          <Step
            icon={<SearchIcon className="w-10 h-10" />}
            title="Search & Compare"
            description="Easily find the best bus options that fit your schedule and budget."
          />
          <Step
            icon={<CheckCircleIcon className="w-10 h-10" />}
            title="Select Your Ride"
            description="Choose your preferred seats and bus company from our trusted partners."
          />
          <Step
            icon={<TicketIcon className="w-10 h-10" />}
            title="Book & Go"
            description="Confirm your booking in a few clicks and get your e-ticket instantly."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
