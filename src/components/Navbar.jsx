import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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
        <nav className={`fixed top-0 left-0 right-0 bg-white shadow-lg z-50 transition-all duration-300 ${isScrolled ? 'h-24' : 'h-40'}`}>
            <Subheader />
            <div className="max-w-7xl mx-auto px-4">
                <div className={`flex justify-between items-center h-full transition-all duration-300`}>
                    {/* Company Name - Left */}
                    <div className="flex-shrink-0 flex items-center w-1/3">
                        <h1 className={`font-bold text-gray-800 transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-xl'}`}>
                            Aden Yönetim ve Temizlik Hizmetleri
                        </h1>
                    </div>

                    {/* Logo - Center */}
                    <div className="flex items-center justify-center w-1/3">
                        <div className={`relative transition-all duration-300 ${isScrolled ? 'w-16 h-16' : 'w-36 h-36'}`}>
                            <img
                                src="/images/aden-logo.png"
                                alt="Company Logo"
                                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300`}
                            />
                        </div>
                    </div>

                    {/* Desktop Navigation - Right */}
                    <div className="hidden md:flex items-center justify-end w-1/3 space-x-4">
                        <a href="#home" className={`text-gray-600 hover:text-gray-900 px-3 py-2 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}>Home</a>
                        <a href="#services" className={`text-gray-600 hover:text-gray-900 px-3 py-2 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}>Hizmetler</a>
                        <a href="#references" className={`text-gray-600 hover:text-gray-900 px-3 py-2 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}>Referanslar</a>
                        <a href="#aboutus" className={`text-gray-600 hover:text-gray-900 px-3 py-2 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}>Hakkımızda</a>
                        <a href="#contact" className={`text-gray-600 hover:text-gray-900 px-3 py-2 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}>İletişim</a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center w-1/3 justify-end">
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
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
                    <a href="#home" className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">Home</a>
                    <a href="#about" className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">About</a>
                    <a href="#services" className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">Services</a>
                    <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">Contact</a>
                </div>
            </div>
        </nav>
    );
};