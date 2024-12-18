import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const slides = [
        {
            image: "./images/slider1.jpg",
            title: "Hoş Geldiniz",
            description: "Sektörümüzde Yeniliğin Öncüsü",
            buttonText: "Daha Fazla Bilgi"
        },
        {
            image: "./images/slider2.jpg",
            title: "Kaliteli Hizmetler",
            description: "Yaptığımız Her İşte Mükemmelliği Sunuyoruz",
            buttonText: "Hizmetlerimiz"
        },
        {
            image: "./images/slider3.jpg",
            title: "Uzman Ekip",
            description: "İhtiyaçlarınıza Yönelik Profesyonel Çözümler",
            buttonText: "Bizimle Tanışın"
        }
    ];

    // Reset auto-play after user interaction
    const resetAutoPlay = useCallback(() => {
        setIsAutoPlaying(false);
        // Resume auto-play after 5 seconds of inactivity
        setTimeout(() => setIsAutoPlaying(true), 5000);
    }, []);

    useEffect(() => {
        let timer;
        if (isAutoPlaying) {
            timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 5000);
        }
        return () => clearInterval(timer);
    }, [isAutoPlaying, slides.length]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        resetAutoPlay();
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        resetAutoPlay();
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        resetAutoPlay();
    };

    return (
        <div className={`relative w-full ${isScrolled ? 'h-[calc(100vh-64px)]' : 'h-[calc(100vh-80px)]'} transition-all duration-300`}>
            {/* Slides */}
            <div className="relative h-full overflow-hidden">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 
              ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-20 h-full flex items-center justify-center">
                            <div className="text-center text-white px-4">
                                <h2 className="text-4xl md:text-6xl font-bold mb-4 transform transition-all duration-500 translate-y-0">
                                    {slide.title}
                                </h2>
                                <p className="text-xl md:text-2xl mb-8 transform transition-all duration-500 translate-y-0">
                                    {slide.description}
                                </p>
                                <a
                                    href="https://wa.me/905324590096"
                                    className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold 
              hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 
              inline-block text-center" // Added inline-block and text-center
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {slide.buttonText}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 
          bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-300"
            >
                <ChevronLeft className="w-6 h-6 text-gray-900" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 
          bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-300"
            >
                <ChevronRight className="w-6 h-6 text-gray-900" />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 
              ${index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50'}`}
                    />
                ))}
            </div>
        </div>

    );
};
