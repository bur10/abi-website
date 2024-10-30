import React from 'react';
import { Phone, Mail, Facebook, Twitter, Instagram, Clock } from 'lucide-react';

const Subheader = () => {
    return (
        <div className="bg-gray-900 text-gray-100 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center py-2 text-sm">
                    {/* Left side - Contact Info */}
                    <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                        <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            <a href="tel:+1234567890" className="hover:text-gray-300 transition-colors">
                                +1 (234) 567-890
                            </a>
                        </div>
                        <div className="hidden sm:flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            <a href="mailto:info@example.com" className="hover:text-gray-300 transition-colors">
                                info@example.com
                            </a>
                        </div>
                        <div className="hidden md:flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>Mon - Fri: 9:00 - 18:00</span>
                        </div>
                    </div>

                    {/* Right side - Social Links */}
                    <div className="flex items-center space-x-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-300 transition-colors"
                        >
                            <Facebook className="w-4 h-4" />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-300 transition-colors"
                        >
                            <Twitter className="w-4 h-4" />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-300 transition-colors"
                        >
                            <Instagram className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subheader;