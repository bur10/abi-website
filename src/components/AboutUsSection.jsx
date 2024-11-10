import React from 'react';
import { Heart, MessageCircle, Share } from 'lucide-react';

const AboutUsSection = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Hakkımızda</h2>
                <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                    Hikayemizi ve üstün hizmet sunma konusundaki kararlılığımızı keşfedin.
                </p>
            </div>

            {/* Two-Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Column - Text Content */}
                <div className="flex flex-col justify-start space-y-4">
                    <h3 className="text-2xl font-semibold text-gray-800">
                        Biz kimiz?
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        Aden Grup, 2021 yılında İzmir’de kurulmuş, site yönetimi alanında uzmanlaşmış bir firmadır. Müşterilerine sunduğu kapsamlı hizmetlerle, peyzaj düzenleme, temizlik ve havuz bakımı gibi birçok alanda yüksek kalite ve titizlikle çözümler üretmektedir. Amacımız, yaşam alanlarınızı daha düzenli, temiz ve sağlıklı hale getirirken, sizlere güvenilir ve sürdürülebilir bir yönetim deneyimi sunmaktır.

                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Deneyimli kadromuz, her projede ihtiyaçlarınıza özel yaklaşımlar geliştirerek müşteri memnuniyetini ön planda tutar. Hizmet verdiğimiz alanlarda sektörün en iyi uygulamalarını ve en güncel teknolojilerini kullanarak, güvenilir bir yönetim anlayışı ile fark yaratmayı hedeflemekteyiz. Her bir projede kalıcı çözümler üreterek, sizlere uzun vadeli bir hizmet deneyimi sunuyoruz. Aden Grup olarak, müşteri odaklı yaklaşımımız ve kaliteli hizmet anlayışımız ile sektörümüzde öne çıkmaya devam ediyoruz.

                    </p>
                </div>

                {/* Right Column - Instagram-Style Video */}
                <div className="flex justify-center items-center lg:pl-8">
                    <div className="w-full max-w-[300px] mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                        {/* Instagram Header */}
                        <div className="px-4 py-3 flex items-center border-b border-gray-100">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 flex items-center justify-center">
                                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600" />
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-semibold text-gray-900"><a href="https://www.instagram.com/adengruptr/" target="_blank" rel="noopener noreferrer">adengruptr</a></p>
                                <p className="text-xs text-gray-500">Original Audio</p>
                            </div>
                        </div>

                        {/* Video Container */}
                        <div className="relative w-full pt-[177.78%] bg-black"> {/* 9:16 aspect ratio */}
                            <video
                                autoPlay
                                muted
                                loop
                                controls
                                className="absolute top-0 left-0 w-full h-full object-cover"
                                src="./videos/aden.mp4"
                            />
                        </div>

                        {/* Instagram Footer */}
                        <div className="px-4 py-3 bg-white">
                            <div className="flex space-x-4">
                                <Heart className="w-6 h-6 text-gray-800 cursor-pointer hover:text-red-500 transition-colors" />
                                <MessageCircle className="w-6 h-6 text-gray-800 cursor-pointer hover:text-blue-500 transition-colors" />
                                <Share className="w-6 h-6 text-gray-800 cursor-pointer hover:text-green-500 transition-colors" />
                            </div>
                            <div className="mt-2">
                                <p className="text-sm font-semibold text-gray-900">1,234 likes</p>
                                <p className="text-sm text-gray-600 mt-1">
                                    <span className="font-semibold">Aden Yönetim ve Temizlik Hizmetleri</span> Hizmetlerimizden haberdar kalın! 🎉
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsSection;