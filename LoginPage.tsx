import React, { useState } from 'react';
import type { Page } from './App';
import { EyeIcon, EyeOffIcon, LockClosedIcon, GoogleIcon, FacebookIcon } from './components/icons';

interface LoginPageProps {
  onLogin: (credentials: { email?: string, password?: string }) => void;
  onNavigate: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="relative flex flex-col md:flex-row w-full max-w-4xl bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden">
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ikaze!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Injira muri konti yawe kugirango ukomeze.</p>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
                <label htmlFor="email-address" className="sr-only">Imeri</label>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                </span>
                <input 
                  id="email-address" 
                  name="email" 
                  type="email" 
                  required 
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition" 
                  placeholder="Imeri" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="relative">
                <label htmlFor="password-sr" className="sr-only">Ijambobanga</label>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input 
                  id="password-sr" 
                  name="password" 
                  type={showPassword ? 'text' : 'password'} 
                  required 
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition" 
                  placeholder="Ijambobanga" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 dark:text-gray-400">
                    {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Nyibuka</label>
                </div>
                <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">Wibagiwe ijambobanga?</a>
                </div>
            </div>
            <div>
                <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-[#0033A0] bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300 shadow-lg">
                Injira
                </button>
            </div>
          </form>
          <div className="my-6 flex items-center justify-center">
            <span className="w-full border-t dark:border-gray-600"></span>
            <span className="px-2 text-xs uppercase text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 -mt-0.5">Cyangwa</span>
            <span className="w-full border-t dark:border-gray-600"></span>
          </div>
          <div className="flex space-x-4">
              <button className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition">
                  <GoogleIcon className="w-5 h-5 mr-2" /> Injira na Google
              </button>
              <button className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition">
                  <FacebookIcon className="w-5 h-5 mr-2 text-blue-600" /> Injira na Facebook
              </button>
          </div>
          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Ntabwo ufite konti?{' '}
            <button onClick={() => onNavigate('register')} className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
              Iyandikishe hano
            </button>
          </p>
        </div>
        <div className="hidden md:block w-1/2 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1593256398246-8853b3815c32?q=80&w=2070&auto=format&fit=crop')"}}>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;