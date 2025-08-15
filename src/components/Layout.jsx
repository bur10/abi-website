import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import Footer from './Footer';
import StickyButton from './StickyButton';
import GetDealModal from './GetDealModal';

const Layout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="min-h-screen bg-white">
            <StickyButton openModal={openModal} isModalOpen={isModalOpen} />
            <Navbar openModal={openModal} />
            <main className="pt-32">
                <Outlet />
            </main>
            <Footer />

            {/* Shared Modal */}
            <GetDealModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default Layout; 