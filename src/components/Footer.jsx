import React from 'react';
import { COMPANY_INFO } from '../constants';

const Footer = () => {
    return (
        <footer id="contact" className="bg-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left Column - Title and Description */}
                    <div className="border-gray-700 border-b md:border-r md:border-b-0 ">
                        <h2 className="text-2xl font-bold mb-4">Bizimle İletişime Geçin</h2>
                        <p className="text-gray-300 mb-6">Sizlerle iletişimde olmaktan mutluluk duyarız! Bize her zaman ulaşabilirsiniz.</p>
                        <p className="text-gray-300 mb-6">© 2024 {COMPANY_INFO.shortName}. Tüm hakları saklıdır.</p>
                    </div>

                    {/* Right Column - Contact Links */}
                    <div>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <i className="fa-solid fa-location-dot text-blue-400"></i>
                                <p className="text-gray-300">{COMPANY_INFO.address}</p>
                            </div>

                            <div className="flex items-center space-x-3">
                                <i className="fa-solid fa-phone text-blue-400"></i>
                                <p className="text-gray-300"><a href={`tel:+${COMPANY_INFO.whatsapp}`}>{COMPANY_INFO.phone}</a></p>
                            </div>

                            <div className="flex items-center space-x-3">
                                <i className="fa-solid fa-envelope text-blue-400"></i>
                                <p className="text-gray-300"><a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a></p>
                            </div>

                            <div className="flex items-center space-x-3">
                                <i className="fab fa-instagram text-blue-400"></i>
                                <p className="text-gray-300">
                                    <a
                                        href={COMPANY_INFO.instagram}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        aria-label="Instagram"
                                    >
                                        {COMPANY_INFO.instagramUsername}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;