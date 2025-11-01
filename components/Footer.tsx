
import React from 'react';
import { FacebookIcon, TwitterIcon, LinkedinIcon } from './icons';

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} className="text-gray-400 hover:text-yellow-300 transition-colors duration-300">{children}</a>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-[#002B7F] to-[#204F46] text-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-lg mb-4">Abo Turi Bo</h4>
            <ul className="space-y-2">
              <li><FooterLink href="#">Amateka yacu</FooterLink></li>
              <li><FooterLink href="#">Imirimo</FooterLink></li>
              <li><FooterLink href="#">Itangazamakuru</FooterLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Serivisi</h4>
            <ul className="space-y-2">
              <li><FooterLink href="#">Gukata Amatike</FooterLink></li>
              <li><FooterLink href="#">Gukodesha Bisi</FooterLink></li>
              <li><FooterLink href="#">Amakuru y'Ingendo</FooterLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Ubufasha</h4>
            <ul className="space-y-2">
              <li><FooterLink href="#">Ibibazo Bikunze Kubazwa</FooterLink></li>
              <li><FooterLink href="#">Twandikire</FooterLink></li>
              <li><FooterLink href="#">Ikigo cy'Ubufasha</FooterLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Amategeko</h4>
            <ul className="space-y-2">
              <li><FooterLink href="#">Amabwiriza</FooterLink></li>
              <li><FooterLink href="#">Ibigendanye n'ibanga</FooterLink></li>
              <li><FooterLink href="#">Amakuru kuri 'Cookies'</FooterLink></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 sm:mb-0">© 2024 Rwanda Bus. Uburenganzira bwose burasigasiriwe.</p>
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