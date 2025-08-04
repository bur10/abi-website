import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, CheckCircle, ArrowLeft, Users, Award, Star } from 'lucide-react';
import { createWhatsAppLink, createEmailLink } from '../constants';
import { generateBreadcrumbs, createServiceAreaSlug, createServiceSlug, cleanServiceNameForSentence, cleanServiceNameForSentenceStart } from '../utils';
import Breadcrumb from './Breadcrumb';

const ServicePageContent = ({ area, service }) => {
    const breadcrumbs = generateBreadcrumbs(area.name, service);

    // Generate service benefits based on service type
    const getServiceBenefits = (serviceName) => {
        const benefits = {
            'Temizlik Hizmetleri': [
                'Hijyen standartlarına uygun temizlik',
                'Çevre dostu temizlik ürünleri',
                'Deneyimli ve eğitimli personel',
                'Esnek çalışma saatleri',
                '7/24 destek hizmeti'
            ],
            'Site ve Apartman Yönetimi': [
                'Mali işlerin şeffaf yönetimi',
                'Teknik bakım ve onarım hizmetleri',
                'Güvenlik ve temizlik koordinasyonu',
                'Yasal mevzuata uygun işletim',
                'Dijital yönetim sistemi'
            ],
            'Personel Temini': [
                'Kalifiye ve deneyimli personel',
                'Hızlı personel temin süreci',
                'SGK ve sigorta işlemleri dahil',
                'Esnek çalışma modelleri',
                'Sürekli eğitim ve gelişim'
            ],
            'Peyzaj Hizmetleri': [
                'Mevsimsel bakım planlaması',
                'Sürdürülebilir peyzaj çözümleri',
                'Sulama sistemi kurulumu',
                'Bitki sağlığı kontrolü',
                'Estetik tasarım yaklaşımı'
            ],
            'Havuz Bakım ve Temizliği': [
                'Su kalitesi testleri',
                'Kimyasal denge kontrolü',
                'Filtrasyon sistemi bakımı',
                'Havuz ekipmanları kontrolü',
                'Düzenli temizlik programı'
            ],
            'Güvenlik Hizmetleri': [
                '24 saat güvenlik devriyesi',
                'CCTV sistemi izleme',
                'Acil durum müdahale',
                'Ziyaretçi kontrol sistemi',
                'Profesyonel güvenlik personeli'
            ]
        };

        return benefits[serviceName] || [
            'Profesyonel hizmet yaklaşımı',
            'Kaliteli ve güvenilir çözümler',
            'Müşteri memnuniyet odaklı hizmet',
            'Rekabetçi fiyatlandırma',
            'Hızlı ve etkili çözümler'
        ];
    };

    const serviceBenefits = getServiceBenefits(service);

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} />
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <div className="mb-8">
                        <Link
                            to={`/hizmet-bolgeleri/${createServiceAreaSlug(area.name)}`}
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {area.name} Hizmetlerine Dön
                        </Link>
                    </div>

                    {/* Page Header */}
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center mb-4">
                            <Award className="w-8 h-8 text-blue-500 mr-3" />
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                                {service}
                            </h1>
                        </div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
                            {area.name} bölgesinde sunduğumuz {cleanServiceNameForSentence(service)} hizmeti
                        </p>
                        <div className="flex items-center justify-center text-blue-600">
                            <MapPin className="w-5 h-5 mr-2" />
                            <span className="font-medium">{area.name}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Service Description */}
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    Hizmet Detayları
                                </h2>
                                <div className="bg-gray-50 rounded-xl p-8">
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        {area.name} bölgesinde sunduğumuz {cleanServiceNameForSentence(service)} ile yaşam ve çalışma alanlarınıza değer katıyoruz. 
                                        Profesyonel ekibimiz ve kaliteli hizmet anlayışımızla, {area.name} ve çevresindeki tüm ilçelerde 
                                        güvenilir çözümler sunuyoruz.
                                    </p>
                                </div>
                            </div>

                            {/* Service Benefits */}
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                                    <Star className="w-8 h-8 text-yellow-500 mr-3" />
                                    Hizmet Avantajları
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {serviceBenefits.map((benefit, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                                        >
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                            <span className="text-gray-700">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Service Area Info */}
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                                    <MapPin className="w-8 h-8 text-blue-500 mr-3" />
                                    Hizmet Kapsamı
                                </h2>
                                <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="text-lg font-semibold text-blue-900 mb-3">Yanıt Süresi</h4>
                                            <div className="flex items-center">
                                                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                                                <span className="text-blue-700 font-medium">{area.responseTime}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-blue-900 mb-3">Hizmet Kapsamı</h4>
                                            <div className="flex items-center">
                                                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                                                <span className="text-blue-700 font-medium">{area.coverage}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Contact Section */}
                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                                    <Users className="w-6 h-6 text-blue-600 mr-2" />
                                    Hizmet Talebi
                                </h3>
                                <p className="text-blue-700 mb-6">
                                    {cleanServiceNameForSentenceStart(service)} hizmetimiz için hemen iletişime geçin ve ücretsiz keşif randevusu alın.
                                </p>
                                <div className="space-y-3">
                                    <a
                                        href={createWhatsAppLink(`${area.name} bölgesinde ${service} hizmeti almak istiyorum. Bilgi verebilir misiniz?`)}
                                        className="flex items-center justify-center w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Phone className="w-5 h-5 mr-2" />
                                        WhatsApp ile İletişim
                                    </a>
                                    <a
                                        href={createEmailLink(
                                            `${service} Hizmet Talebi - ${area.name}`,
                                            `Merhaba,\n\n${area.name} bölgesinde ${service} hizmeti almak istiyorum.\n\nDetaylı bilgi verebilir misiniz?\n\nTeşekkürler.`
                                        )}
                                        className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                                    >
                                        <Mail className="w-5 h-5 mr-2" />
                                        E-posta Gönder
                                    </a>
                                </div>
                            </div>

                            {/* Other Services */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Diğer Hizmetlerimiz
                                </h3>
                                <div className="space-y-2">
                                    {area.services
                                        .filter(s => s !== service)
                                        .map((otherService, index) => (
                                            <Link
                                                key={index}
                                                to={`/hizmet-bolgeleri/${createServiceSlug(area.name, otherService)}`}
                                                className="block py-2 px-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 group"
                                            >
                                                <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                                                    {otherService}
                                                </span>
                                            </Link>
                                        ))}
                                </div>
                            </div>

                            {/* Coverage Area */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                    <MapPin className="w-6 h-6 text-blue-500 mr-2" />
                                    {area.name === "Ege Bölgesi" ? "Hizmet Verdiğimiz İller" : "Hizmet Verdiğimiz İlçeler"}
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {area.districts.map((district, index) => (
                                        <div
                                            key={index}
                                            className="text-sm text-gray-600 py-1 px-2 bg-white rounded border border-gray-200"
                                        >
                                            {district}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServicePageContent; 