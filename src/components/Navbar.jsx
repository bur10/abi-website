import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import Subheader from './Subheader';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 bg-white shadow-lg z-50 transition-all duration-300`}>
            <Subheader />
            <div className="max-w-7xl mx-auto px-4">
                <div className={`relative flex items-center transition-all duration-300 ${isScrolled ? 'h-20' : 'h-32'}`}>
                    {/* Logo - Left on desktop, centered on mobile/tablet */}
                    <div className="flex items-center justify-center lg:justify-start w-full lg:w-auto">
                        <div className={`relative transition-all duration-300 ${isScrolled ? 'w-16 h-16' : 'w-32 h-32'}`}>
                            <a href="#home">
                                <img
                                    src="./images/aden-logo.png"
                                    alt="Company Logo"
                                    className={`w-full h-full object-contain transition-all duration-300`}
                                />
                            </a>
                        </div>
                    </div>

                    {/* Desktop Navigation - Right */}
                    <div className="hidden lg:flex items-center justify-end space-x-4 ml-auto">
                        <a href="#services" className={`text-gray-600 hover:text-gray-900 px-3 py-2 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}>Hizmetler</a>
                        <a href="#service-areas" className={`text-gray-600 hover:text-gray-900 px-3 py-2 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}>Hizmet Bölgeleri</a>
                        <a href="#references" className={`text-gray-600 hover:text-gray-900 px-3 py-2 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}>Referanslar</a>
                        <a href="#aboutus" className={`text-gray-600 hover:text-gray-900 px-3 py-2 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}>Hakkımızda</a>
                        <a href="#contact" className={`text-gray-600 hover:text-gray-900 px-3 py-2 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}>İletişim</a>
                    </div>

                    {/* Mobile Menu Button - Absolute positioned on right */}
                    <div className="lg:hidden absolute right-0 top-1/2 transform -translate-y-1/2">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            {isOpen ? (
                                <X className={`transition-all duration-300 ${isScrolled ? 'h-5 w-5' : 'h-6 w-6'}`} />
                            ) : (
                                <Menu className={`transition-all duration-300 ${isScrolled ? 'h-5 w-5' : 'h-6 w-6'}`} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} border-t border-gray-200`}>
                    <div className="py-2 space-y-1">
                        <a href="#services" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">Hizmetler</a>
                        <a href="#service-areas" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">Hizmet Bölgeleri</a>
                        <a href="#references" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">Referanslar</a>
                        <a href="#aboutus" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">Hakkımızda</a>
                        <a href="#contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">İletişim</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};