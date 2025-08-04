import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, CheckCircle, ArrowRight, Users, Award } from 'lucide-react';
import { createWhatsAppLink, createEmailLink } from '../constants';
import { createServiceSlug, generateBreadcrumbs, cleanServiceNameForSentence } from '../utils';
import Breadcrumb from './Breadcrumb';

const ServiceAreaPageContent = ({ area }) => {
    const breadcrumbs = generateBreadcrumbs(area.name);

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} />
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Page Header */}
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center mb-4">
                            <MapPin className="w-8 h-8 text-blue-500 mr-3" />
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                                {area.name}
                            </h1>
                        </div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            {area.description}
                        </p>

                        {/* Key Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                                <h3 className="text-lg font-semibold text-blue-800 mb-2">Yanıt Süresi</h3>
                                <p className="text-blue-700">{area.responseTime}</p>
                            </div>
                            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                                <h3 className="text-lg font-semibold text-green-800 mb-2">Hizmet Kapsamı</h3>
                                <p className="text-green-700">{area.coverage}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Services Section */}
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                                <Award className="w-8 h-8 text-blue-500 mr-3" />
                                Sunduğumuz Hizmetler
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {area.services.map((service, index) => (
                                    <Link
                                        key={index}
                                        to={`/hizmet-bolgeleri/${createServiceSlug(area.name, service)}`}
                                        className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 group"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                {service}
                                            </h3>
                                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            {area.name} bölgesinde sunduğumuz {cleanServiceNameForSentence(service)} hakkında detaylı bilgi alın.
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Districts & Contact Sidebar */}
                        <div className="space-y-8">
                            {/* Districts */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                    <MapPin className="w-6 h-6 text-blue-500 mr-2" />
                                    {area.name === "Ege Bölgesi" ? "Hizmet Verdiğimiz İller" : "Hizmet Verdiğimiz İlçeler"}
                                </h3>
                                <div className="space-y-2">
                                    {area.districts.map((district, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center py-2 px-3 bg-white rounded-lg border border-gray-200"
                                        >
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                                            <span className="text-gray-700">{district}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Section */}
                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                                    <Users className="w-6 h-6 text-blue-600 mr-2" />
                                    Hemen İletişime Geçin
                                </h3>
                                <p className="text-blue-700 mb-6">
                                    {area.name} bölgesindeki hizmetlerimiz hakkında detaylı bilgi almak için bizimle iletişime geçin.
                                </p>
                                <div className="space-y-3">
                                    <a
                                        href={createWhatsAppLink(`${area.name} bölgesindeki hizmetleriniz hakkında bilgi almak istiyorum.`)}
                                        className="flex items-center justify-center w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Phone className="w-5 h-5 mr-2" />
                                        WhatsApp ile İletişim
                                    </a>
                                    <a
                                        href={createEmailLink(
                                            `${area.name} Hizmet Talebi`,
                                            `Merhaba,\n\n${area.name} bölgesindeki hizmetleriniz hakkında bilgi almak istiyorum.\n\nTeşekkürler.`
                                        )}
                                        className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                                    >
                                        <Mail className="w-5 h-5 mr-2" />
                                        E-posta Gönder
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServiceAreaPageContent; 