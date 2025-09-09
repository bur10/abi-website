import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroSlider } from '../components/HeroSlider';
import ServicesSection from '../components/ServicesSection';
import ServiceAreasSection from '../components/ServiceAreasSection';
import ReferencesSection from '../components/ReferencesSection';
import AboutUsSection from '../components/AboutUsSection';

const HomePage = () => {
    return (
        <>
            <Helmet>
                <title>Aden Grup - Site Yönetimi ve Temizlik Hizmetleri | İzmir</title>
                <meta name="description" content="İzmir ve çevresinde site yönetimi, temizlik hizmetleri, personel temini ve peyzaj hizmetleri. Profesyonel ekibimizle yanınızdayız." />
                <link rel="canonical" href="https://www.adenmanagement.com" />
            </Helmet>
            <section id="home">
                <HeroSlider />
            </section>
            <section id="services">
                <ServicesSection />
            </section>
            <section id="aboutus" className="py-20 bg-gray-50">
                <AboutUsSection />
            </section>
            <section id="service-areas">
                <ServiceAreasSection />
            </section>
            <section id="references">
                <ReferencesSection />
            </section>

        </>
    );
};

export default HomePage; 