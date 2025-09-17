// File: src/components/StickyButton.jsx
import React from 'react';

const StickyButton = ({ openModal, isModalOpen }) => {
    return (
        <div className="fixed bottom-4 right-4 flex flex-col space-y-3" style={{ zIndex: 1000 }}>
            {/* Get a Deal Now Button
            <button
                onClick={openModal}
                disabled={isModalOpen}
                className={`py-2 px-4 rounded-full flex items-center shadow-lg transition duration-300 ${isModalOpen
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
            >
                <i className="fas fa-broom mr-2"></i>
                <span className="hidden md:block">Temizlik Hizmeti Al!</span>
            </button> */}

            {/* WhatsApp Button */}
            <a
                target='_blank'
                href="https://wa.me/905324590096"
                className={`py-2 px-4 rounded-full flex items-center shadow-lg transition duration-300 ${isModalOpen
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed pointer-events-none'
                    : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                rel="noopener noreferrer"
            >
                <i className="fab fa-whatsapp mr-2"></i>
                <span className="hidden md:block">Hemen İletişime Geç!</span>
            </a>
        </div>
    );
};

export default StickyButton;
