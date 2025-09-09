import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { REFERENCES } from '../constants';

// Reference Card Component
const ReferenceCard = ({ image, title, description }) => {
    return (
        <div className="min-w-[280px] max-w-xs bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100 flex-shrink-0 ml-6 first:ml-2">
            {/* Image Container */}
            <div className="w-full h-44 p-4 bg-gray-50 flex items-center justify-center">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain mix-blend-multiply"
                    draggable="false"
                />
            </div>

            {/* Content */}
            <div className="p-3 text-center bg-white">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            </div>
        </div>
    );
};

// PropTypes for ReferenceCard
ReferenceCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string
};

// References Section Component
const ReferencesSection = () => {
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Mouse Down Handler
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    // Mouse Leave Handler
    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    // Mouse Up Handler
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Mouse Move Handler
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 1.25;
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleScroll = (direction) => {
        if (containerRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };



    return (
        <section id="references" className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Referanslarımız</h2>
                    <p className="text-lg text-gray-600 mt-2">Güvenimizi Kanıtlayan İşbirliklerimiz</p>
                </div>

                {/* Carousel Wrapper */}
                <div className="relative flex items-center">
                    {/* Left Arrow */}
                    <button
                        onClick={() => handleScroll('left')}
                        className="absolute -left-4 z-10 bg-white p-2.5 rounded-full shadow-lg hover:bg-gray-50 hover:scale-110 transition-all duration-200 focus:outline-none"
                    >
                        <ChevronLeft className="h-6 w-6 text-gray-800" />
                    </button>

                    {/* References Carousel */}
                    <div
                        ref={containerRef}
                        className={`flex overflow-x-auto overflow-y-hidden hide-scroll-bar py-4 px-2 -mx-4 cursor-grab ${isDragging ? 'cursor-grabbing select-none' : ''
                            }`}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            scrollBehavior: isDragging ? 'auto' : 'smooth'
                        }}
                    >
                        {REFERENCES.map(ref => (
                            <ReferenceCard
                                key={ref.id}
                                image={ref.image}
                                title={ref.title}
                                description={ref.description}
                            />
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => handleScroll('right')}
                        className="absolute -right-4 z-10 bg-white p-2.5 rounded-full shadow-lg hover:bg-gray-50 hover:scale-110 transition-all duration-200 focus:outline-none"
                    >
                        <ChevronRight className="h-6 w-6 text-gray-800" />
                    </button>
                </div>
            </div>


        </section>
    );
};

export default ReferencesSection;