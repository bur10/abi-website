import React from 'react';

// Individual Service Card Component
const ServiceCard = ({ image, title, description }) => {
    return (
        <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 h-full">
            {/* Image Container with fixed aspect ratio */}
            <div className="relative pt-[60%]">
                <img
                    src={image}
                    alt={title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 flex-grow">{description}</p>

                {/* Learn More Button */}
                <a
                    href='https://wa.me/905324590096'
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 inline-block text-center"
                    target="_blank"  // Opens in new tab
                    rel="noopener noreferrer"  // Security best practice for external links
                >
                    Detaylı Bilgi
                </a>
            </div>
        </div>
    );
};

// Services Section Component
const ServicesSection = () => {
    // Sample services data - replace with your actual services
    const services = [
        {
            id: 1,
            image: "./images/temizlik-hizmetleri.jpg",
            title: "Temizlik Hizmetleri",
            description: "Yaşam alanlarınızda hijyen standartlarına uygun, kapsamlı temizlik çözümleri sunarak sağlıklı ve düzenli bir ortam sağlıyoruz."
        },
        {
            id: 2,
            image: "./images/peyzaj-hizmetleri.jpg",
            title: "Peyzaj Bakım Hizmetleri",
            description: "Peyzaj düzenleme ve bitki bakımı hizmetlerimizle, dış mekanlarınıza estetik ve bakımlı bir görünüm kazandırıyoruz."
        },
        {
            id: 3,
            image: "./images/havuz-hizmetleri.jpg",
            title: "Havuz Bakım Hizmetleri",
            description: "Havuzlarınızın temiz, güvenli ve her daim kullanıma hazır olması için profesyonel bakım ve su kalitesi kontrol hizmetleri sunuyoruz."
        },
        {
            id: 4,
            image: "./images/site-apartman-hizmetleri.jpg",
            title: "Site Apartman ve Tesis Yönetimi",
            description: "Site, apartman ve tesis yönetiminde; mali, idari ve teknik süreçleri kapsayan bütüncül çözümlerle güvenli, konforlu yaşam alanları oluşturuyoruz."
        }
    ];

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

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service) => (
                        <ServiceCard
                            key={service.id}
                            image={service.image}
                            title={service.title}
                            description={service.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;