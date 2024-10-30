import React from 'react';
import './App.css'
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import ServicesSection from './components/ServicesSection';
import ReferencesSection from './components/ReferencesSection';
import AboutUsSection from './components/AboutUsSection';
import Footer from './components/Footer';
import StickyButton from './components/StickyButton';
import Subheader from './components/Subheader';


const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <StickyButton />
      <Subheader />
      <Navbar />
      <main className='pt-20'>
        <section id="home">
          <HeroSlider />
        </section>
        <section id="services">
          <ServicesSection />
        </section>
        <section id="references">
          <ReferencesSection />
        </section>
        <section id="aboutus" className='py-20 bg-gray-50'>
          <AboutUsSection />
        </section>
        <section id='contact'>
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default App;