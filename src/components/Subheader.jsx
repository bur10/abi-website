import React from 'react';
import { Phone, Instagram } from 'lucide-react';

const Subheader = ({ openModal }) => {

    return (
        <>
            <div className="bg-gray-900 text-gray-100 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center py-2 text-sm">
                        <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                            <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-2" />
                                <a href="tel:+905324590096" className="hover:text-gray-300 transition-colors">
                                    +90 (532) 459 00 96
                                </a>
                            </div>
                        </div>

                        {/* Right side - Social Links and Mobile Button */}
                        <div className="flex items-center space-x-4">

                            <a
                                href="https://instagram.com/adengruptr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-gray-300 transition-colors flex items-center gap-1"
                            >
                                <Instagram className="w-4 h-4" />
                                <span>adengruptr</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Subheader;