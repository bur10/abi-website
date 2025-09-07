import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import Subheader from './Subheader';

export const Navbar = ({ openModal }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

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

    // Helper function to scroll to section on home page
    const scrollToSection = (sectionId) => {
        if (location.pathname === '/') {
            // If we're on the home page, scroll to the section
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsOpen(false);
    };

    // Handle navigation to home page with hash
    const handleHomePageNavigation = (hash) => {
        if (location.pathname === '/') {
            // If already on home page, scroll to section
            scrollToSection(hash.replace('#', ''));
        } else {
            // If on different page, navigate to home with hash
            window.location.href = `/${hash}`;
        }
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 bg-white shadow-lg z-50 transition-all duration-300`}>
            <Subheader openModal={openModal} />
            <div className="max-w-7xl mx-auto px-4">
                <div className={`relative flex items-center transition-all duration-300 ${isScrolled ? 'h-20' : 'h-32'}`}>
                    {/* Logo - Left on desktop, centered on mobile/tablet */}
                    <div className="flex items-center justify-center lg:justify-start w-full lg:w-auto lg:ml-8">
                        <div className={`relative transition-all duration-300 ${isScrolled ? 'w-16 h-16' : 'w-32 h-32'}`}>
                            <Link to="/" onClick={() => scrollToSection('home')}>
                                <img
                                    src="/images/aden-logo.png"
                                    alt="Company Logo"
                                    className={`w-full h-full object-contain transition-all duration-300`}
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Navigation - Right */}
                    <div className="hidden lg:flex items-center ml-auto space-x-1">
                        {location.pathname === '/' ? (
                            <button
                                onClick={() => scrollToSection('services')}
                                className={`text-gray-600 hover:text-gray-900 px-3 py-2 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}
                            >
                                Hizmetler
                            </button>
                        ) : (
                            <button
                                onClick={() => handleHomePageNavigation('#services')}
                                className={`text-gray-600 hover:text-gray-900 px-3 py-2 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}
                            >
                                Hizmetler
                            </button>
                        )}

                        <Link
                            to="/hizmet-bolgeleri"
                            className={`text-gray-600 hover:text-gray-900 px-3 py-2 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'} ${location.pathname.startsWith('/hizmet-bolgeleri') ? 'text-blue-600 font-medium' : ''}`}
                        >
                            Hizmet Bölgeleri
                        </Link>

                        <Link
                            to="/blog"
                            className={`text-gray-600 hover:text-gray-900 px-3 py-2 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'} ${location.pathname.startsWith('/blog') ? 'text-blue-600 font-medium' : ''}`}
                        >
                            Blog
                        </Link>

                        {location.pathname === '/' ? (
                            <button
                                onClick={() => scrollToSection('references')}
                                className={`text-gray-600 hover:text-gray-900 px-3 py-2 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}
                            >
                                Referanslar
                            </button>
                        ) : (
                            <button
                                onClick={() => handleHomePageNavigation('#references')}
                                className={`text-gray-600 hover:text-gray-900 px-3 py-2 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}
                            >
                                Referanslar
                            </button>
                        )}

                        {location.pathname === '/' ? (
                            <button
                                onClick={() => scrollToSection('aboutus')}
                                className={`text-gray-600 hover:text-gray-900 px-3 py-2 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}
                            >
                                Hakkımızda
                            </button>
                        ) : (
                            <button
                                onClick={() => handleHomePageNavigation('#aboutus')}
                                className={`text-gray-600 hover:text-gray-900 px-3 py-2 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}
                            >
                                Hakkımızda
                            </button>
                        )}

                        {location.pathname === '/' ? (
                            <button
                                onClick={() => scrollToSection('contact')}
                                className={`text-gray-600 hover:text-gray-900 px-3 py-2 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}
                            >
                                İletişim
                            </button>
                        ) : (
                            <button
                                onClick={() => handleHomePageNavigation('#contact')}
                                className={`text-gray-600 hover:text-gray-900 px-3 py-2 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}
                            >
                                İletişim
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button - Absolute positioned on right */}
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 lg:hidden">
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
                        {location.pathname === '/' ? (
                            <button
                                onClick={() => scrollToSection('services')}
                                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                            >
                                Hizmetler
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    handleHomePageNavigation('#services');
                                    setIsOpen(false);
                                }}
                                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                            >
                                Hizmetler
                            </button>
                        )}

                        <Link
                            to="/hizmet-bolgeleri"
                            onClick={() => setIsOpen(false)}
                            className={`block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md ${location.pathname.startsWith('/hizmet-bolgeleri') ? 'text-blue-600 font-medium' : ''}`}
                        >
                            Hizmet Bölgeleri
                        </Link>

                        <Link
                            to="/blog"
                            onClick={() => setIsOpen(false)}
                            className={`block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md ${location.pathname.startsWith('/blog') ? 'text-blue-600 font-medium' : ''}`}
                        >
                            Blog
                        </Link>

                        {location.pathname === '/' ? (
                            <button
                                onClick={() => scrollToSection('references')}
                                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                            >
                                Referanslar
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    handleHomePageNavigation('#references');
                                    setIsOpen(false);
                                }}
                                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                            >
                                Referanslar
                            </button>
                        )}

                        {location.pathname === '/' ? (
                            <button
                                onClick={() => scrollToSection('aboutus')}
                                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                            >
                                Hakkımızda
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    handleHomePageNavigation('#aboutus');
                                    setIsOpen(false);
                                }}
                                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                            >
                                Hakkımızda
                            </button>
                        )}

                        {location.pathname === '/' ? (
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                            >
                                İletişim
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    handleHomePageNavigation('#contact');
                                    setIsOpen(false);
                                }}
                                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                            >
                                İletişim
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};