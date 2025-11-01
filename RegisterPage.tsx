import React from 'react';
import type { Page } from './App';

interface RegisterPageProps {
  onNavigate: (page: Page) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
           <div className="rounded-md shadow-sm -space-y-px">
             <div>
              <label htmlFor="full-name" className="sr-only">Full Name</label>
              <input id="full-name" name="name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm" placeholder="Full Name" />
            </div>
            <div>
              <label htmlFor="email-address-reg" className="sr-only">Email address</label>
              <input id="email-address-reg" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm" placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password-reg" className="sr-only">Password</label>
              <input id="password-reg" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-[#0033A0] bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300">
              Sign Up
            </button>
          </div>
        </form>
         <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button onClick={() => onNavigate('login')} className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </button>
          </p>
      </div>
    </div>
  );
};

export default RegisterPage;
