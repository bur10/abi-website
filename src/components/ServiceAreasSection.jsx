import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MapPin, Phone, Mail, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import { SERVICE_AREAS, createWhatsAppLink, createEmailLink } from '../constants';

// Service Area Card Component
const ServiceAreaCard = ({ area, isActive, onClick, animationDelay }) => {
    return (
        <div
            className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 animate-cardEntranceStagger transition-smooth h-full flex flex-col ${isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
            style={{ animationDelay: `${animationDelay}ms` }}
            onClick={() => onClick(area)}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${isActive ? 'text-blue-700' : 'text-gray-800'}`}>
                    {area.name}
                </h3>
                <MapPin className={`w-6 h-6 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{area.responseTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">{area.coverage}</span>
                </div>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Sunulan Hizmetler:</p>
                <div className="flex flex-wrap gap-1">
                    {area.services.slice(0, 3).map((service, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                            {service}
                        </span>
                    ))}
                    {area.services.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{area.services.length - 3} daha
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

// PropTypes for ServiceAreaCard
ServiceAreaCard.propTypes = {
    area: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        responseTime: PropTypes.string.isRequired,
        coverage: PropTypes.string.isRequired,
        services: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    animationDelay: PropTypes.number
};

// Detailed Area View Component
const DetailedAreaView = ({ area, onClose, isVisible }) => {
    return (
        <div className={`w-full ${isVisible ? 'animate-expandedViewSlideIn' : ''}`}>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-t-lg">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors transition-smooth-fast flex-shrink-0"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <div className="flex-1">
                            <h3 className="text-3xl font-bold mb-2">{area.name}</h3>
                            <p className="text-blue-100 text-lg mb-4 md:mb-0">{area.description}</p>

                            {/* Mobile: Show time and coverage info below description */}
                            <div className="block md:hidden mt-4 space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4 text-blue-300" />
                                    <span className="text-sm font-medium text-blue-100">{area.responseTime}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-4 h-4 text-green-300" />
                                    <span className="text-sm font-medium text-blue-100">{area.coverage}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop: Show time and coverage info on the right */}
                    <div className="hidden md:block">
                        <div className="text-right">
                            <div className="flex items-center space-x-2 mb-2">
                                <Clock className="w-5 h-5 text-blue-300" />
                                <span className="text-sm font-medium text-blue-100">{area.responseTime}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-300" />
                                <span className="text-sm font-medium text-blue-100">{area.coverage}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="bg-gray-50 p-8 rounded-b-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Sunulan Hizmetler</h4>
                        <div className="space-y-3">
                            {area.services.map((service, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700">{service}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Districts */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                            {area.name === "Ege Bölgesi" ? "Hizmet Verilen İller" : "Hizmet Verilen İlçeler"}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            {area.districts.map((district, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <MapPin className="w-3 h-3 text-blue-500" />
                                    <span className="text-sm text-gray-600">{district}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-6 text-center">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                        {area.name} bölgesinde hizmet almak ister misiniz?
                    </h4>
                    <p className="text-gray-600 mb-4">
                        Uzman ekibimiz {area.responseTime} içinde sizinle iletişime geçecektir.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href={createWhatsAppLink(`${area.name} bölgesinde hizmet almak istiyorum`)}
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 transition-smooth-fast"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Phone className="w-4 h-4" />
                            <span>WhatsApp ile İletişim</span>
                        </a>
                        <a
                            href={createEmailLink(`${area.name} Hizmet Talebi`, `Merhaba, ${area.name} bölgesinde hizmet almak istiyorum.`)}
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 transition-smooth-fast"
                        >
                            <Mail className="w-4 h-4" />
                            <span>E-posta Gönder</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// PropTypes for DetailedAreaView
DetailedAreaView.propTypes = {
    area: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        responseTime: PropTypes.string.isRequired,
        coverage: PropTypes.string.isRequired,
        services: PropTypes.arrayOf(PropTypes.string).isRequired,
        districts: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    isVisible: PropTypes.bool
};

// Service Areas Section Component
const ServiceAreasSection = () => {
    const [selectedArea, setSelectedArea] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleAreaClick = (area) => {
        if (isAnimating) return;

        setIsAnimating(true);
        setSelectedArea(area);

        // Quick timeout just to prevent double-clicks
        setTimeout(() => {
            setIsAnimating(false);
        }, 50);
    };

    const handleClose = () => {
        if (isAnimating) return;

        setIsAnimating(true);
        setSelectedArea(null);

        // Quick timeout just to prevent double-clicks
        setTimeout(() => {
            setIsAnimating(false);
        }, 50);
    };

    return (
        <section id="service-areas" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Hizmet Bölgelerimiz
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Ege bölgesinin geniş bir alanında kaliteli hizmet sunuyoruz.
                        Her bölge için özel yaklaşımlar ve hızlı çözümler üretiyoruz.
                    </p>
                </div>

                {/* Content Area */}
                {selectedArea ? (
                    // Expanded Area View
                    <div>
                        <DetailedAreaView
                            area={selectedArea}
                            onClose={handleClose}
                            isVisible={true}
                        />
                    </div>
                ) : (
                    // Service Areas Grid and CTA
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                            {SERVICE_AREAS.map((area, index) => (
                                <ServiceAreaCard
                                    key={area.id}
                                    area={area}
                                    isActive={false}
                                    onClick={handleAreaClick}
                                    animationDelay={index * 100}
                                />
                            ))}
                        </div>

                        {/* Call to Action */}
                        <div className="bg-white rounded-xl shadow-lg p-8 text-center animate-cardEntranceStagger" style={{ animationDelay: '400ms' }}>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Bölgeniz listede yok mu?
                            </h3>
                            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                Hizmet alanımızı sürekli genişletiyoruz. Bölgenizde hizmet alabilirsiniz,
                                bizimle iletişime geçin ve size özel çözümler oluşturalım.
                            </p>
                            <a
                                href={createWhatsAppLink("Bölgemde hizmet alabilir miyim?")}
                                className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium transition-smooth-fast"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Phone className="w-5 h-5" />
                                <span>Hizmet Alanı Sorgulama</span>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ServiceAreasSection; 