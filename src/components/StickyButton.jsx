// File: src/components/StickyButton.jsx
import React from 'react';

const StickyButton = () => {
    return (
        <a
            target='_blank'
            href="https://web.whatsapp.com/send?phone=+905324590096"
            className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-full flex items-center shadow-lg hover:bg-green-600 transition duration-300"
            style={{ zIndex: 1000 }}
            rel="noopener noreferrer"
        >
            <i className="fab fa-whatsapp mr-2"></i> {/* WhatsApp Icon */}
            <span className="hidden md:block">Hemen Teklif Al!</span> {/* Hide text on smaller screens */}
        </a>
    );
};

export default StickyButton;
