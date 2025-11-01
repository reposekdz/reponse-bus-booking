import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Twandikire</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                Twishimira kumva icyo udutekerezaho! Niba ufite ikibazo, igitekerezo, cyangwa icyifuzo, itsinda ryacu ryiteguye kugusubiza.
            </p>
        </div>
        <div className="mt-16 max-w-lg mx-auto bg-white dark:bg-gray-800/50 p-8 rounded-xl shadow-lg">
             <form className="space-y-6">
                <div>
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Amazina Yuzuye</label>
                    <input type="text" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                    <label htmlFor="email-contact" className="text-sm font-medium text-gray-700 dark:text-gray-300">Imeri</label>
                    <input type="email" id="email-contact" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                    <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">Ubutumwa</label>
                    <textarea id="message" rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600"></textarea>
                </div>
                <div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-[#0033A0] bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300">
                        Ohereza Ubutumwa
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;