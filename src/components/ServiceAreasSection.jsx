import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MapPin, Phone, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { SERVICE_AREAS, createWhatsAppLink } from '../constants';
import { createServiceAreaSlug } from '../utils';

// Service Area Card Component
const ServiceAreaCard = ({ area, animationDelay }) => {
    return (
        <div
            className="service-area-card bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 animate-cardEntranceStagger"
            style={{ animationDelay: `${animationDelay}ms` }}
        >
            {/* Header Section - Fixed Height */}
            <div className="flex items-center justify-between mb-4 h-8">
                <h3 className="text-xl font-bold text-gray-800 truncate">
                    {area.name}
                </h3>
                <MapPin className="w-6 h-6 text-blue-500 flex-shrink-0" />
            </div>

            {/* Description Section - Fixed Height */}
            <div className="mb-4 h-16 flex items-start">
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {area.description}
                </p>
            </div>

            {/* Info Section - Fixed Height */}
            <div className="space-y-2 mb-4 h-16">
                <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{area.responseTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{area.coverage}</span>
                </div>
            </div>

            {/* Services Preview Section - Fixed Height */}
            <div className="mb-6 h-28">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Sunulan Hizmetler:
                </h4>
                <div className="services-tags h-20">
                    {area.services.slice(0, 3).map((service, idx) => (
                        <span
                            key={idx}
                            className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mb-1 mr-1"
                        >
                            {service}
                        </span>
                    ))}
                    {area.services.length > 3 && (
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mb-1 mr-1">
                            +{area.services.length - 3} daha
                        </span>
                    )}
                </div>
            </div>

            {/* Button Section - Fixed at Bottom */}
            <div className="mt-auto">
                <Link
                    to={`/hizmet-bolgeleri/${createServiceAreaSlug(area.name)}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium group"
                >
                    <span>Detayları Görüntüle</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

// PropTypes for ServiceAreaCard
ServiceAreaCard.propTypes = {
    area: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        responseTime: PropTypes.string.isRequired,
        coverage: PropTypes.string.isRequired,
        services: PropTypes.arrayOf(PropTypes.string).isRequired,
        districts: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    animationDelay: PropTypes.number
};

// Service Areas Section Component
const ServiceAreasSection = () => {
    return (
        <section id="service-areas" className="py-20 bg-gray-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Hizmet Bölgelerimiz
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                        Ege bölgesinin geniş bir alanında kaliteli hizmet sunuyoruz.
                        Her bölge için özel yaklaşımlar ve hızlı çözümler üretiyoruz.
                    </p>
                    <Link
                        to="/hizmet-bolgeleri"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                    >
                        <span>Tüm Hizmet Bölgelerini Görüntüle</span>
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </div>

                {/* Service Areas Grid */}
                <div className="service-areas-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-16">
                    {SERVICE_AREAS.map((area, index) => (
                        <ServiceAreaCard
                            key={area.id}
                            area={area}
                            animationDelay={index * 100}
                        />
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center bg-white rounded-xl p-8 shadow-lg">
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