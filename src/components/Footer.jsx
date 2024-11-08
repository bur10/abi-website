import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left Column - Title and Description */}
                    <div className="border-r border-gray-700">
                        <h2 className="text-2xl font-bold mb-4">Bizimle İletişime Geçin</h2>
                        <p className="text-gray-300 mb-6">Sizlerle iletişimde olmaktan mutluluk duyarız! Bize her zaman ulaşabilirsiniz.</p>
                    </div>

                    {/* Right Column - Contact Links */}
                    <div>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <i className="fa-solid fa-location-dot text-blue-400"></i>
                                <p className="text-gray-300">Cumhuriyet Mahallesi 2005 Sokak No: 1/2 İç Kapı No: 25</p>
                            </div>

                            <div className="flex items-center space-x-3">
                                <i className="fa-solid fa-phone text-blue-400"></i>
                                <p className="text-gray-300"><a href="tel:+905327946023">+90 (532) 794 60 23</a></p>
                            </div>

                            <div className="flex items-center space-x-3">
                                <i className="fa-solid fa-envelope text-blue-400"></i>
                                <p className="text-gray-300"><a href="mailto:info@adengruptr.com">info@adengruptr.com</a></p>
                            </div>

                            <div className="flex items-center space-x-3">
                                <i className="fab fa-instagram text-blue-400"></i>
                                <p className="text-gray-300">
                                    <a
                                        href="https://www.instagram.com/adengruptr/"
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        aria-label="Instagram"
                                    >
                                        adengruptr
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