
import React from 'react';
import { FacebookIcon, TwitterIcon, LinkedinIcon } from './icons';

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} className="text-gray-400 hover:text-yellow-300 transition-colors duration-300">{children}</a>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-[#002B7F] to-[#204F46] text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-lg mb-4">About Us</h4>
            <ul className="space-y-2">
              <li><FooterLink href="#">Our Story</FooterLink></li>
              <li><FooterLink href="#">Careers</FooterLink></li>
              <li><FooterLink href="#">Press</FooterLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li><FooterLink href="#">Bus Booking</FooterLink></li>
              <li><FooterLink href="#">Charter Services</FooterLink></li>
              <li><FooterLink href="#">Route Information</FooterLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li><FooterLink href="#">FAQ</FooterLink></li>
              <li><FooterLink href="#">Contact Us</FooterLink></li>
              <li><FooterLink href="#">Help Center</FooterLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><FooterLink href="#">Terms of Service</FooterLink></li>
              <li><FooterLink href="#">Privacy Policy</FooterLink></li>
              <li><FooterLink href="#">Cookie Policy</FooterLink></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 sm:mb-0">© 2024 Rwanda Bus. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white"><FacebookIcon className="h-6 w-6" /></a>
            <a href="#" className="text-gray-400 hover:text-white"><TwitterIcon className="h-6 w-6" /></a>
            <a href="#" className="text-gray-400 hover:text-white"><LinkedinIcon className="h-6 w-6" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
