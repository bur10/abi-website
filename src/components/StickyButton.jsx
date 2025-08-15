// File: src/components/StickyButton.jsx
import React, { useState } from 'react';
import GetDealModal from './GetDealModal';

const StickyButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {/* Button Container */}
            <div className="fixed bottom-4 right-4 flex flex-col space-y-3" style={{ zIndex: 1000 }}>
                {/* Get a Deal Now Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full flex items-center shadow-lg hover:bg-blue-600 transition duration-300"
                >
                    <i className="fas fa-handshake mr-2"></i>
                    <span className="hidden md:block">3 Adımda Teklif Al!</span>
                </button>

                {/* WhatsApp Button */}
                <a
                    target='_blank'
                    href="https://wa.me/905324590096"
                    className="bg-green-500 text-white py-2 px-4 rounded-full flex items-center shadow-lg hover:bg-green-600 transition duration-300"
                    rel="noopener noreferrer"
                >
                    <i className="fab fa-whatsapp mr-2"></i>
                    <span className="hidden md:block">Hemen İletişime Geç!</span>
                </a>
            </div>

            {/* Modal */}
            <GetDealModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default StickyButton;
