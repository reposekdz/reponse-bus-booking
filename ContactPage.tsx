import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Contact Us</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                We'd love to hear from you! Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
            </p>
        </div>
        <div className="mt-16 max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg">
             <form className="space-y-6">
                <div>
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
                </div>
                <div>
                    <label htmlFor="email-contact" className="text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email-contact" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
                </div>
                <div>
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                    <textarea id="message" rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"></textarea>
                </div>
                <div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-[#0033A0] bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300">
                        Send Message
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
