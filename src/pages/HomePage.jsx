import React from 'react';
import { HeroSlider } from '../components/HeroSlider';
import ServicesSection from '../components/ServicesSection';
import ServiceAreasSection from '../components/ServiceAreasSection';
import ReferencesSection from '../components/ReferencesSection';
import AboutUsSection from '../components/AboutUsSection';

const HomePage = () => {
    return (
        <>
            <section id="home">
                <HeroSlider />
            </section>
            <section id="services">
                <ServicesSection />
            </section>
            <section id="service-areas">
                <ServiceAreasSection />
            </section>
            <section id="references">
                <ReferencesSection />
            </section>
            <section id="aboutus" className="py-20 bg-gray-50">
                <AboutUsSection />
            </section>
        </>
    );
};

export default HomePage; 