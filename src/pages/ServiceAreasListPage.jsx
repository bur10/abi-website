import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { SERVICE_AREAS, createWhatsAppLink } from '../constants';
import { createServiceAreaSlug, generateBreadcrumbs } from '../utils';
import Breadcrumb from '../components/Breadcrumb';

const ServiceAreasListPage = () => {
    const breadcrumbs = generateBreadcrumbs();

    return (
        <>
            <Helmet>
                <title>Hizmet Bölgeleri | Aden Grup</title>
                <meta name="description" content="Ege bölgesinde hizmet verdiğimiz bölgelerin listesi. Torbalı, İzmir merkez ve diğer bölgelerde sunduğumuz hizmetleri keşfedin." />
                <link rel="canonical" href="https://www.adengruptr.com/hizmet-bolgeleri" />
            </Helmet>
            <Breadcrumb breadcrumbs={breadcrumbs} />
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Page Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Hizmet Bölgelerimiz
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Ege bölgesinin geniş bir alanında kaliteli hizmet sunuyoruz.
                            Her bölge için özel yaklaşımlar ve hızlı çözümler üretiyoruz.
                        </p>
                    </div>

                    {/* Service Areas Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
                        {SERVICE_AREAS.map((area, index) => (
                            <div
                                key={area.id}
                                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 border border-gray-200 hover:border-blue-300 transition-all duration-300 animate-cardEntranceStagger h-full flex flex-col"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {area.name}
                                    </h2>
                                    <MapPin className="w-6 h-6 text-blue-500" />
                                </div>

                                <p className="text-gray-600 mb-4 flex-grow">{area.description}</p>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm text-gray-600">{area.responseTime}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span className="text-sm text-gray-600">{area.coverage}</span>
                                    </div>
                                </div>

                                {/* Services Preview */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                        Sunulan Hizmetler:
                                    </h4>
                                    <div className="flex flex-wrap gap-1">
                                        {area.services.slice(0, 3).map((service, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                            >
                                                {service}
                                            </span>
                                        ))}
                                        {area.services.length > 3 && (
                                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                +{area.services.length - 3} daha
                                            </span>
                                        )}
                                    </div>
                                </div>

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
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="text-center bg-gray-50 rounded-xl p-8">
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
        </>
    );
};

export default ServiceAreasListPage; 