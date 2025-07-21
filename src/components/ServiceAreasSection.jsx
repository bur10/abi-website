import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { SERVICE_AREAS, createWhatsAppLink, createEmailLink } from '../constants';

// Service Area Card Component
const ServiceAreaCard = ({ area, isActive, onClick }) => {
    return (
        <div
            className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
            onClick={() => onClick(area)}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${isActive ? 'text-blue-700' : 'text-gray-800'}`}>
                    {area.name}
                </h3>
                <MapPin className={`w-6 h-6 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
            </div>

            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{area.responseTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">{area.coverage}</span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
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
    onClick: PropTypes.func.isRequired
};

// Detailed Area View Component
const DetailedAreaView = ({ area }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{area.name}</h3>
                    <p className="text-gray-600">{area.description}</p>
                </div>
                <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700">{area.responseTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-medium text-gray-700">{area.coverage}</span>
                    </div>
                </div>
            </div>

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
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        {area.name} bölgesinde hizmet almak ister misiniz?
                    </h4>
                    <p className="text-gray-600 mb-4">
                        Uzman ekibimiz {area.responseTime} içinde sizinle iletişime geçecektir.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href={createWhatsAppLink(`${area.name} bölgesinde hizmet almak istiyorum`)}
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Phone className="w-4 h-4" />
                            <span>WhatsApp ile İletişim</span>
                        </a>
                        <a
                            href={createEmailLink(`${area.name} Hizmet Talebi`, `Merhaba, ${area.name} bölgesinde hizmet almak istiyorum.`)}
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
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
    }).isRequired
};

// Service Areas Section Component
const ServiceAreasSection = () => {
    const [selectedArea, setSelectedArea] = useState(null);

    const handleAreaClick = (area) => {
        setSelectedArea(selectedArea?.id === area.id ? null : area);
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

                {/* Service Areas Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {SERVICE_AREAS.map((area) => (
                        <ServiceAreaCard
                            key={area.id}
                            area={area}
                            isActive={selectedArea?.id === area.id}
                            onClick={handleAreaClick}
                        />
                    ))}
                </div>

                {/* Detailed View */}
                {selectedArea && (
                    <DetailedAreaView area={selectedArea} />
                )}

                {/* Call to Action */}
                <div className="mt-16 bg-white rounded-xl shadow-lg p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Bölgeniz listede yok mu?
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Hizmet alanımızı sürekli genişletiyoruz. Bölgenizde hizmet alabilirsiniz,
                        bizimle iletişime geçin ve size özel çözümler oluşturalım.
                    </p>
                    <a
                        href={createWhatsAppLink("Bölgemde hizmet alabilir miyim?")}
                        className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Phone className="w-5 h-5" />
                        <span>Hizmet Alanı Sorgulama</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ServiceAreasSection; 