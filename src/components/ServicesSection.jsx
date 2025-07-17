import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp, X, ArrowLeft } from 'lucide-react';
import { SERVICE_CATEGORIES, createWhatsAppLink } from '../constants';

// Individual Service Item Component for subtitles
const ServiceItem = ({ title, description, index }) => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
            <div className="flex items-start space-x-4 flex-grow">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                </div>
                <div className="flex-grow flex flex-col h-full">
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">{title}</h4>
                    <p className="text-gray-600 leading-relaxed flex-grow mb-4">{description}</p>
                    <a
                        href={createWhatsAppLink(`${title} Hizmeti hakkında bilgi almak istiyorum`)}
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 text-sm font-medium self-start"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Bu Hizmet İçin İletişime Geç
                    </a>
                </div>
            </div>
        </div>
    );
};

// PropTypes for ServiceItem
ServiceItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
};

// Expanded Service View Component
const ExpandedServiceView = ({ category, onClose }) => {
    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-t-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <div>
                            <h2 className="text-3xl font-bold mb-2">{category.title}</h2>
                            <p className="text-blue-100 text-lg">{category.description}</p>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <img
                            src={category.image}
                            alt={category.title}
                            className="w-24 h-24 rounded-lg object-cover border-4 border-white border-opacity-30"
                        />
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="bg-gray-50 p-8 rounded-b-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.services.map((service, index) => (
                        <ServiceItem
                            key={index}
                            title={service.title}
                            description={service.description}
                            index={index}
                        />
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-8 bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {category.title} hakkında daha fazla bilgi almak ister misiniz?
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Uzman ekibimiz size özel çözümler sunmak için hazır.
                    </p>
                    <a
                        href={createWhatsAppLink(`${category.title} hakkında detaylı bilgi almak istiyorum`)}
                        className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 inline-block font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        WhatsApp ile Hemen İletişime Geç
                    </a>
                </div>
            </div>
        </div>
    );
};

// PropTypes for ExpandedServiceView
ExpandedServiceView.propTypes = {
    category: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        services: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        })).isRequired
    }).isRequired,
    onClose: PropTypes.func.isRequired
};

// Service Category Card Component
const ServiceCategoryCard = ({ category, onExpand }) => {
    return (
        <div
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group"
            onClick={() => onExpand(category)}
        >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-white/90 text-sm mb-3">{category.description}</p>
                    <div className="flex items-center space-x-2 text-blue-300">
                        <span className="text-sm font-medium">Detayları Görüntüle</span>
                        <ChevronDown className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>

            {/* Service Count Badge */}
            <div className="p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">
                        {category.services.length} farklı hizmet
                    </span>
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                        <ChevronDown className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// PropTypes for ServiceCategoryCard
ServiceCategoryCard.propTypes = {
    category: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        services: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        })).isRequired
    }).isRequired,
    onExpand: PropTypes.func.isRequired
};

// Services Section Component
const ServicesSection = () => {
    const [expandedCategory, setExpandedCategory] = useState(null);

    const handleExpand = (category) => {
        setExpandedCategory(category);
    };

    const handleClose = () => {
        setExpandedCategory(null);
    };



    return (
        <section id="services" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Hizmetlerimiz
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        İşletmenizin ihtiyaçlarına yönelik kapsamlı çözümler sunuyoruz.
                    </p>
                </div>

                {/* Content Area */}
                {expandedCategory ? (
                    // Expanded Service View
                    <div className="animate-fadeIn">
                        <ExpandedServiceView
                            category={expandedCategory}
                            onClose={handleClose}
                        />
                    </div>
                ) : (
                    // Services Grid
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
                        {SERVICE_CATEGORIES.map((category) => (
                            <ServiceCategoryCard
                                key={category.id}
                                category={category}
                                onExpand={handleExpand}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ServicesSection;