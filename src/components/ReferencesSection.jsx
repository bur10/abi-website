import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Reference Card Component
const ReferenceCard = ({ image, title, description }) => {
    return (
        <div className="min-w-[300px] max-w-xs bg-white rounded-lg shadow-lg overflow-hidden mx-2 transition-transform duration-300 hover:scale-105">
            {/* Image */}
            <img src={image} alt={title} className="w-full h-40 object-contain" />

            {/* Content */}
            <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <p className="text-gray-600 mt-2">{description}</p>
            </div>
        </div>
    );
};

// References Section Component
const ReferencesSection = () => {
    const containerRef = useRef(null);

    const references = [
        { id: 1, image: "/images/references/galetos.png", title: "Client A", description: "Provided exceptional service." },
        { id: 3, image: "/images/references/oasis-marina.jpg", title: "Client C", description: "A highly recommended partner." },
        { id: 4, image: "/images/references/omeroglu-baharat.png", title: "Client D", description: "Outstanding UX/UI solutions." },
        { id: 2, image: "/images/references/mia-koru.png", title: "Client B", description: "Increased our engagement rate." },
        { id: 5, image: "/images/references/viven.svg", title: "Client E", description: "Outstanding UX/UI solutions." },
        // Add more references as needed
    ];

    const scrollLeft = () => {
        containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <section id="references" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Referanslarımız</h2>
                    <p className="text-lg text-gray-600 mt-2">Some of our most valued clients and their testimonials.</p>
                </div>

                {/* Carousel Wrapper */}
                <div className="relative flex items-center">
                    {/* Left Arrow */}
                    <button onClick={scrollLeft} className="absolute left-0 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                        <ChevronLeft className="h-6 w-6 text-gray-800" />
                    </button>

                    {/* References Carousel */}
                    <div
                        ref={containerRef}
                        className="flex overflow-x-auto hide-scroll-bar space-x-4 px-8">
                        {references.map(ref => (
                            <ReferenceCard key={ref.id} image={ref.image} title={ref.title} description={ref.description} />
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button onClick={scrollRight} className="absolute right-0 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                        <ChevronRight className="h-6 w-6 text-gray-800" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ReferencesSection;
